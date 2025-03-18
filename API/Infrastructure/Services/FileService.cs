using Application.Common.Interfaces;
using Application.CQRS.Files.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System.Security;

namespace Infrastructure.Services;

public class FileService(IConfiguration configuration) : IFileService
{
    private readonly IConfiguration _configuration = configuration;

    public async Task<(string filePath, string fileHash, long fileSize)> SaveFileAsync(IFormFile file, Guid userId)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("File is empty or null", nameof(file));

        string userStoragePath = GetUserStoragePath(userId);


        Directory.CreateDirectory(userStoragePath);



        string uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
        string filePath = Path.Combine(userStoragePath, uniqueFileName);

        string fileHash = await ComputeFileHashAsync(file);


        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return (filePath, fileHash, file.Length);
    }

    public Task<FileDownloadDto> GetFileAsync(string filePath)
    {
        return Task.Run(() =>
        {
            if (!IsPathSafe(filePath))
            {
                throw new SecurityException("Invalid file path detected");
            }

            if (!File.Exists(filePath))
                throw new FileNotFoundException("File not found", filePath);

            string fileName = Path.GetFileName(filePath);
            string contentType = GetContentType(filePath);


            using var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            using var memoryStream = new MemoryStream();
            fileStream.CopyTo(memoryStream);
            byte[] fileContent = memoryStream.ToArray();

            return new FileDownloadDto
            {
                FileName = fileName,
                ContentType = contentType,
                FilePath = filePath,
                FileContent = fileContent
            };
        });
    }
    private static bool IsPathSafe(string filePath)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(filePath))
                return false;

            string normalizedPath = Path.GetFullPath(filePath);

            if (filePath.Contains("..") || filePath.Contains("./") || filePath.Contains(@"\.") ||
                filePath.Contains("//") || filePath.Contains(@"\\"))
                return false;

            if (!File.Exists(filePath))
                return false;

            FileAttributes attr = File.GetAttributes(filePath);
            if (attr.HasFlag(FileAttributes.System) || attr.HasFlag(FileAttributes.Hidden))
                return false;

            string extension = Path.GetExtension(filePath).ToLowerInvariant();
            string[] allowedExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".docx", ".xlsx", ".txt", ".zip" };
            if (!allowedExtensions.Contains(extension))
                return false;

            return true;
        }
        catch
        {
            return false;
        }
    }

    public Task DeleteFileAsync(string filePath)
    {
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
        }
        return Task.CompletedTask;
    }

    public Task<bool> ValidateFileAsync(IFormFile file, long availableSpace)
    {
        return Task.Run(async () =>
        {
            try
            {
                if (file == null || file.Length == 0)
                    return false;

                if (file.Length > availableSpace)
                    return false;

                string extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                string[] allowedExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".docx", ".xlsx", ".txt", ".zip" };

                if (!allowedExtensions.Contains(extension))
                    return false;

                using var stream = new MemoryStream();
                await file.CopyToAsync(stream);
                stream.Position = 0;
                byte[] fileBytes = new byte[8];
                await stream.ReadAsync(fileBytes, 0, fileBytes.Length);

                bool hasSafeSignature = VerifyUploadedFileSignature(extension, fileBytes);
                if (!hasSafeSignature)
                    return false;

                return true;
            }
            catch
            {
                return false;
            }
        });
    }

    public async Task<string> ComputeFileHashAsync(IFormFile file)
    {
        using var ms = new MemoryStream();
        await file.CopyToAsync(ms);
        ms.Position = 0;

        using var sha256 = SHA256.Create();
        byte[] hashBytes = sha256.ComputeHash(ms);

        return Convert.ToHexString(hashBytes).ToLowerInvariant();
    }

    public string GetUserStoragePath(Guid userId)
    {
        string baseStoragePath = _configuration["FileStorage:BasePath"] ?? "FileStorage";
        return Path.Combine(baseStoragePath, userId.ToString());
    }

    public long GetMaxUserStorageSizeBytes()
    {
        return 5L * 1024 * 1024 * 1024;
    }

    private string GetContentType(string filePath)
    {
        string magicContentType = VerifyFileSignature(filePath);
        if (magicContentType != null)
        {
            return magicContentType;
        }

        var extension = Path.GetExtension(filePath).ToLowerInvariant();
        return extension switch
        {
            ".jpg" or ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".pdf" => "application/pdf",
            ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ".txt" => "text/plain",
            ".zip" => "application/zip",
            _ => "application/octet-stream"
        };
    }
    private static string VerifyFileSignature(string filePath)
    {
        try
        {
            byte[] fileBytes = new byte[8];
            using (FileStream fs = new(filePath, FileMode.Open, FileAccess.Read))
            {
                fs.Read(fileBytes, 0, fileBytes.Length);
            }

            if (fileBytes[0] == 0xFF && fileBytes[1] == 0xD8 && fileBytes[2] == 0xFF)
                return "image/jpeg";

            if (fileBytes[0] == 0x89 && fileBytes[1] == 0x50 && fileBytes[2] == 0x4E && fileBytes[3] == 0x47)
                return "image/png";

            if (fileBytes[0] == 0x47 && fileBytes[1] == 0x49 && fileBytes[2] == 0x46 && fileBytes[3] == 0x38)
                return "image/gif";

            if (fileBytes[0] == 0x25 && fileBytes[1] == 0x50 && fileBytes[2] == 0x44 && fileBytes[3] == 0x46)
                return "application/pdf";

            if (fileBytes[0] == 0x50 && fileBytes[1] == 0x4B && fileBytes[2] == 0x03 && fileBytes[3] == 0x04)
                return "application/zip";

            return string.Empty;
        }
        catch
        {
            return string.Empty;
        }
    }
    private static bool VerifyUploadedFileSignature(string extension, byte[] fileBytes)
    {
        switch (extension)
        {
            case ".jpg":
            case ".jpeg":
                return fileBytes[0] == 0xFF && fileBytes[1] == 0xD8 && fileBytes[2] == 0xFF;

            case ".png":
                return fileBytes[0] == 0x89 && fileBytes[1] == 0x50 && fileBytes[2] == 0x4E && fileBytes[3] == 0x47;

            case ".gif":
                return fileBytes[0] == 0x47 && fileBytes[1] == 0x49 && fileBytes[2] == 0x46 && fileBytes[3] == 0x38;

            case ".pdf":
                return fileBytes[0] == 0x25 && fileBytes[1] == 0x50 && fileBytes[2] == 0x44 && fileBytes[3] == 0x46;

            case ".zip":
                return fileBytes[0] == 0x50 && fileBytes[1] == 0x4B && fileBytes[2] == 0x03 && fileBytes[3] == 0x04;

            default:
                return true;
        }
    }
}
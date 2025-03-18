using Application.CQRS.Files.DTOs;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Interfaces;

public interface IFileService
{
    Task<(string filePath, string fileHash, long fileSize)> SaveFileAsync(IFormFile file, Guid userId);
    Task<FileDownloadDto> GetFileAsync(string filePath);
    Task DeleteFileAsync(string filePath);
    Task<bool> ValidateFileAsync(IFormFile file, long availableSpace);
    Task<string> ComputeFileHashAsync(IFormFile file);
    string GetUserStoragePath(Guid userId);
    long GetMaxUserStorageSizeBytes();
}
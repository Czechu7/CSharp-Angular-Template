namespace Application.Common.Models;
public class ResponseBase 
{
    public int StatusCode { get; set; } = 200;
    public string Message { get; set; } = "OK";
    public bool Success { get; set; } = true;
    public List<string>? Errors { get; set; }

    public static ResponseBase SuccessResponse(string message = "OK")
    {
        return new ResponseBase
        {
            StatusCode = 200,
            Message = message,
            Success = true
        };
    }

    public static ResponseBase ErrorResponse(int statusCode, string message, List<string>? errors = null)
    {
        return new ResponseBase
        {
            StatusCode = statusCode,
            Message = message,
            Success = false,
            Errors = errors
        };
    }
}

public class Response<T> : ResponseBase
{
    public T? Data { get; set; }
    public int? TotalCount { get; set; }
    public int? PageNumber { get; set; }
    public int? PageSize { get; set; }

   
    public static Response<T> SuccessWithData(T data, string message = "OK")
    {
        return new Response<T>
        {
            Data = data,
            StatusCode = 200,
            Message = message,
            Success = true
        };
    }

    public static Response<T> SuccessWithPagination(T data, int totalCount, int pageNumber, int pageSize, string message = "OK")
    {
        return new Response<T>
        {
            Data = data,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize,
            StatusCode = 200,
            Message = message,
            Success = true
        };
    }

public static Response<T> SuccessResponse(T data, string message = "OK")
{
    return SuccessWithData(data, message);
}
    public static new Response<T> ErrorResponse(int statusCode, string message, List<string>? errors = null)
    {
        return new Response<T>
        {
            Data = default,
            StatusCode = statusCode,
            Message = message,
            Success = false,
            Errors = errors
        };
    }
}
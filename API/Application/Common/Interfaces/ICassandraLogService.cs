using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.Models;

namespace Application.Common.Interfaces;

public interface ICassandraLogService
{
    Task LogSecurityEventAsync(
        string userId, 
        string action, 
        string resource, 
        string resourceId, 
        string result, 
        int statusCode,
        string? ipAddress = null,
        string? message = null,
        string? additionalData = null);
        
    Task LogApplicationErrorAsync(
        Exception exception,
        string context,
        string? userId = null);
        
    Task<IEnumerable<SecurityEventLog>> GetSecurityEventsAsync(
        string? userId = null, 
        DateTime? fromDate = null, 
        DateTime? toDate = null,
        int? statusCode = null,
        int limit = 100);
        
    Task<IEnumerable<ApplicationErrorLog>> GetApplicationErrorsAsync(
        string? userId = null, 
        DateTime? fromDate = null, 
        DateTime? toDate = null,
        int limit = 100);
}
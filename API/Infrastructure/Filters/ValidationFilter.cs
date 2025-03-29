using Application.Common.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Infrastructure.Filters;

public class ValidationFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var errorsList = new List<string>();
            
            foreach (var (key, value) in context.ModelState)
            {
                if (value.Errors.Count > 0)
                {
                    foreach (var error in value.Errors)
                    {
                        errorsList.Add($"{key}: {error.ErrorMessage}");
                    }
                }
            }
            
            var response = ResponseBase.ErrorResponse(400, "Validation failed", errorsList);
            
            context.Result = new BadRequestObjectResult(response);
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
    }
}
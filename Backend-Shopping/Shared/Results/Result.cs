using Shared.Exceptions;

namespace Shared.Results
{
    public interface IResult
    {
        public string Message { get; }
        public HttpException Exception { get; }
    }
    public class Result : IResult
    {
        public Result(string message)
        {
            Message = message;
            Exception = null!;
        }
        public Result(string message, HttpException exception)
        {
            Message = message;
            Exception = exception;
        }
        public Result(HttpException exception)
        {
            Message = null!;
            Exception = exception;
        }

        public string Message { get; }

        public HttpException Exception { get; }


    }

}
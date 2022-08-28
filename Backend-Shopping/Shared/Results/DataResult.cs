using Shared.Exceptions;

namespace Shared.Results
{
    public interface IDataResult<out T> : IResult
    {
        public T Data { get; }
        public int? TotalData { get; set; }
    }

    public class DataResult<T> : IDataResult<T>
    {
        public DataResult(T data, string message)
        {
            Data = data;
            Message = message;
            Exception = null!;
        }
        public DataResult(T data, string message, int? totalData)
        {
            Data = data;
            Message = message;
            TotalData = totalData;
            Exception = null!;
        }
        public DataResult(T data, HttpException exception)
        {
            Data = data;
            Message = null!;
            Exception = exception;
        }

        public DataResult(T data, int? totalData)
        {
            Data = data;
            TotalData = totalData;
            Message = null!;
            Exception = null!;
        }
        public T Data { get; }
        public int? TotalData { get; set; }

        public string Message { get; }

        public HttpException Exception { get; }
    }

}
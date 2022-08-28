using System;

namespace Shared.Exceptions
{
    public class HttpException : Exception
    {

        public int StatusCode { get; set; }
        public object Response { get; set; }

        public HttpException(int statusCode, string message)
        {
            StatusCode = statusCode;
            Response = new
            {
                message
            };
        }

    }
}
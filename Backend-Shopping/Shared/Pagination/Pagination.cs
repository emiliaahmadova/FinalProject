namespace Shared.Pagination
{
    public class Pagination
    {
        const int maxPageSize = 50;
        const int minPageSize = 1;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
                _pageSize = (value < minPageSize) ? minPageSize : value;
            }
        }

    }
}
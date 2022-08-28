namespace DataService.dtos.Filter
{
    public class FilterOptions
    {
        public string Name { get; set; }
        public int[] BrandId { get; set; }
        public int[] DepartmentId { get; set; }
        public int[] CategoryId { get; set; }
        public double MinPrice { get; set; } = 0;
        public double MaxPrice { get; set; } = 99999999999999999;
    }
}
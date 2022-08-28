namespace DataService.Data.Entities
{
    public abstract class BaseEntity
    {
        public int Id { get; set; }
        public string CreateDate { get; set; }
        public string UpdateDate { get; set; }
        public int Order { get; set; }
        public bool IsActive { get; set; }

    }
}
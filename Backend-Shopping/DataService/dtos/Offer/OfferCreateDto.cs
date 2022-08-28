namespace DataService.dtos.Offer
{
    public class OfferCreateDto
    {
        public int Order { get; set; }
        public string Icon { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }
}
namespace CRUD_Design
{
    public class Memo
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public DateTime? Date { get; set; }
        public string Text { get; set; }
        public int UserId { get; set; }
    }
}


using System.ComponentModel.DataAnnotations;

namespace CRUD_Design.Models
{
    public class CreateMemoDTO
    {
        [Required]
        public new string? Title { get; set; }
        public new DateTime? Date { get; set; }
        
        [Required]
        [MaxLength(500)]
        public new string Text { get; set; }

        [Required]
        public int UserId { get; set; }

    }
}

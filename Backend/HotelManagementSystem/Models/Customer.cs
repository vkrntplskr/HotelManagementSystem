using System.ComponentModel.DataAnnotations;

namespace HotelManagementSystem.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        [Required]
        [StringLength(30)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; } = string.Empty;
        [Required]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be exactly 10 digits")]
        public string Phone { get; set; } = string.Empty;

    }
}

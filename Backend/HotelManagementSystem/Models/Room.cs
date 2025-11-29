using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagementSystem.Models
{
    public class Room
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]//auto increment
        public int RoomId { get; set; }
        [Required(ErrorMessage = "Room number is required.")]
        [Range(1, 100, ErrorMessage = "Room number must be between 1 and 100.")]
        public int RoomNumber { get; set; }
        [Required]
        [AllowedValues("Single", "Double", "Suite", ErrorMessage = "Type must be either 'Single', 'Double', or 'Suite'.")]
        public string Type { get; set; } = "Single";
        [Required]
        [Column(TypeName = "decimal(18,2)")]

        public decimal Price { get; set; }
        [Required]
        public bool Status { get; set; } 

    }
}

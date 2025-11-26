using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagementSystem.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        [Required(ErrorMessage = "CustomerId is required.")]
        [ForeignKey("Customer")]
        public int CustomerId { get; set; }

        [Required(ErrorMessage = "RoomId is required.")]
        [ForeignKey("Room")]
        public int RoomId { get; set; }

        [Required(ErrorMessage = "Check-in date is required.")]
        [DataType(DataType.Date)]
        public DateTime CheckInDate { get; set; }

        [Required(ErrorMessage = "Check-out date is required.")]
        [DataType(DataType.Date)]
        public DateTime CheckOutDate { get; set; }

        // Status : true = Active, false = Cancelled
        [Required]
        public bool Status { get; set; }

        // Navigation properties
        public Customer Customer { get; set; } = null!;
        public Room Room { get; set; } = null!;
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HotelManagementSystem.Models;

namespace HotelManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public BookingController(HotelDbContext context)
        {
            _context = context;
        }

        // api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            return await _context.Bookings
                .Include(b => b.Room)       // Include related Room data
                .Include(b => b.Customer)   // Include related Customer data
                .ToListAsync();
        }

        // api/Bookings
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            // FORCE ID TO 0: Ensures DB generates the Auto-Increment ID
            booking.BookingId = 0;

            // Validate Check-out must be after Check-in
            if (booking.CheckOutDate <= booking.CheckInDate)
            {
                return BadRequest("Check-out date must be after check-in date.");
            }

            // Check for overlapping bookings
            bool isRoomBooked = await _context.Bookings.AnyAsync(b =>
                b.RoomId == booking.RoomId &&
                b.Status == true && // Only check active bookings
                b.CheckInDate < booking.CheckOutDate &&
                b.CheckOutDate > booking.CheckInDate
            );

            if (isRoomBooked)
            {
                return BadRequest("This room is already booked for the selected dates.");
            }

            booking.Status = true; // Set booking as Active

            // We set the room's status to false (Booked)
            var room = await _context.Rooms.FindAsync(booking.RoomId);
            if (room != null)
            {
                room.Status = false; // Mark room as 'Booked'
                _context.Entry(room).State = EntityState.Modified;
            }

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.BookingId }, booking);
        }

        // api/Bookings/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _context.Bookings
                .Include(b => b.Room)
                .Include(b => b.Customer)
                .FirstOrDefaultAsync(b => b.BookingId == id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // api/Bookings/Cancel/id
        [HttpPut("Cancel/{id}")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            // Mark booking as cancelled
            booking.Status = false;

            // Release the room (Make it available again)
            var room = await _context.Rooms.FindAsync(booking.RoomId);
            if (room != null)
            {
                room.Status = true; // Mark room as 'Available'
                _context.Entry(room).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
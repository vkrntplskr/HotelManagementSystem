using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HotelManagementSystem.Models;

namespace HotelManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public DashboardController(HotelDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<object>> GetDashboardStats()
        {
            var totalRooms = await _context.Rooms.CountAsync();

            // available rooms where Status = true
            var availableRooms = await _context.Rooms.CountAsync(r => r.Status == true);
            var bookedRooms = await _context.Rooms.CountAsync(r => r.Status == false);

            // total active bookings where Status = true
            var activeBookings = await _context.Bookings.CountAsync(b => b.Status == true);

            return new
            {
                TotalRooms = totalRooms,
                AvailableRooms = availableRooms,
                BookedRooms = bookedRooms,
                TotalActiveBookings = activeBookings
            };
        }
    }
}
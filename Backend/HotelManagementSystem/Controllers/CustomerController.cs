using Microsoft.AspNetCore.Mvc;

namespace HotelManagementSystem.Controllers
{
    public class CustomerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

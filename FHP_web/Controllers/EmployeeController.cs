using Microsoft.AspNetCore.Mvc;

namespace FHP_web.Controllers
{
    public class EmployeeController : Controller
    {
        public IActionResult Upsert()
        {
            FHP_Res.Entity.Trainee trainee = new FHP_Res.Entity.Trainee();
            return View(trainee);
        }
    }
}

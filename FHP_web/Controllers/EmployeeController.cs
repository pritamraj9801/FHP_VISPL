using FHP_DL;
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
        [HttpPost]
        public IActionResult Upsert(FHP_Res.Entity.Trainee trainee)
        {
            // -------------- if serial number is 0 then this operation is Add
            if (trainee.SerialNumber == 0)
            {
                TraineeRepository repository = new TraineeRepository();
                if (repository.Add(trainee))
                {
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    return View(trainee);
                }
            }
            // -------------- if serial number is not 0 then this operation is update
            else
            {

                return View(trainee);
            }
        }
    }
}

using FHP_web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace FHP_web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public ActionResult SignInPage()
        {
            return PartialView("~/Views/Home/_SignInPage.cshtml");
        }
        public ActionResult RegisterationPage()
        {
            return PartialView("~/Views/Home/_RegisterationPage.cshtml");
        }
        public FHP_Res.Entity.Trainee[] GetAllTrainee()
        {
            FHP_DL.TraineeRepository repository = new FHP_DL.TraineeRepository();
            FHP_Res.Entity.Trainee[] trainees =  repository.GetAllTrainee().ToArray();
            return trainees;
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

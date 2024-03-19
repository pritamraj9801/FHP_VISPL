using FHP_DL;
using FHP_Res.Entity;
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
            //  TraineeRepository repository = new TraineeRepository();
            //List<Trainee> trainees = repository.GetAllTrainee();

            // return View(trainees);
            return View();
        }
        public ActionResult SignInPage()
        {
            return PartialView("~/Views/Shared/_SignInPage.cshtml");
        }
        public ActionResult RegisterationPage()
        {
            return PartialView("~/Views/Shared/_RegisterationPage.cshtml");
        }
        public List<FHP_Res.Entity.Trainee> GetAllTrainee()
        {
            TraineeRepository repository = new TraineeRepository();
            List<FHP_Res.Entity.Trainee> trainees = repository.GetAllTrainee();
            return trainees;
        }
        public ActionResult SigleTrainee(int? id)
        {
            // -------------- if id == 0, then the operation is Addition
            if (id == 0)
            {
                return View();
            }
            else
            {
                TraineeRepository repository = new TraineeRepository();
                Trainee? trainee = repository.GetAllTrainee().Where(t => t.SerialNumber == id).FirstOrDefault();
                return View(trainee);
            }
        }
        [HttpPost]
        public ActionResult SigleTrainee(Trainee trainee)
        {
            // -------- addding
            if (trainee.SerialNumber == 0)
            {
                TraineeRepository repository = new TraineeRepository();
                if (repository.Add(trainee))
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    return View();
                }
            }
            // -------- updating 
            else
            {
                TraineeRepository repository = new TraineeRepository();
                if (repository.Update(trainee))
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    return View();
                }
            }

        }
        public ActionResult ReadOnlyView(int? id)
        {
            TraineeRepository traineeRepository = new TraineeRepository();
            Trainee? trainee = traineeRepository.GetAllTrainee().Where(t => t.SerialNumber == id).FirstOrDefault();
            return View(trainee);
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

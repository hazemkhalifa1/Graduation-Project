using AESLibrary;
using BLL;
using Microsoft.AspNetCore.Mvc;
using Pl.Models;
using Pl.Utitly;
using System.Diagnostics;

namespace Pl.Controllers
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
            return View(new messageVM());
        }
        [HttpPost]
        public IActionResult Index(messageVM message)
        {
            if (ModelState.IsValid)
            {
                string path = "";
                string text = "";

                if (message.File is not null)
                    path = DocumentSetting.UploadFile(message.File, "file");
                using (StreamReader reader = new StreamReader("wwwroot\\Files\\file\\" + path))
                {
                    text = reader.ReadToEnd();
                }
                DocumentSetting.DeleteFile(path, "file");
                if (!string.IsNullOrWhiteSpace(text))
                {
                    if (message.Degree == degree.middle)
                    {
                        if (message.Type == type.encryption)
                        {
                            var cipher = Rsa.Encryption(text);
                            return View("Result", new ResultVM { Text = cipher });
                        }
                        else
                        {
                            var output = Rsa.Decryption(text);
                            return View("Result", new ResultVM { Text = output });
                        }
                    }
                    else
                    {
                        if (message.Type == type.encryption)
                        {

                            var output = AESAlgorithm.Encrypt(text, message.key);
                            return View("Result", new ResultVM { Text = output });

                        }
                        else
                        {
                            var output = AESAlgorithm.Decrypt(text, message.key);
                            return View("Result", new ResultVM { Text = output });
                        }
                    }
                }
            }
            return View();
        }

        public IActionResult Home()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

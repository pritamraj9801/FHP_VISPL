using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHP_Res.Entity
{
    public class Trainee
    {
        public long SerialNumber { get; set; }
        public string Prefix { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public byte Education { get; set; }
        public DateTime JoiningDate { get; set; }
        public string CurrentCompany {  get; set; }
        public string CurrentAddress { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}

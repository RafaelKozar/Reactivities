using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Domain
{    
    public class AppUser : IdentityUser
    {
        public string DisplayName{get; set;}
        public string Bio { get; set; }
    }
}
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.Connections;

namespace UserServices.Models
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //[Column(TypeName = "varchar(10)")]
        public int UserID { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string UserName { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string email { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string password { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string isOwner { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        
    }
}

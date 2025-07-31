namespace UserServices.Models
{
    public class ForgotPasswordRequest
    {
        public string email { get; set; }
    }
    public class ResetPasswordRequest
    {
        public string email { get; set; }
        public string newPassword { get; set; }
    }
}

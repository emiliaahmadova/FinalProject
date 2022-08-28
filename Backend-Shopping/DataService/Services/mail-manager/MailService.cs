using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using DataService.Data.Entities;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;

namespace DataService.Services.mail_manager
{
    public interface IMailService
    {
        Task SendMailAsync(dynamic data, MailType mailType, string attachment = null);
    }
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;
        private IConfiguration _configuration;

        public MailService(IOptions<MailSettings> options, IConfiguration configuration)
        {
            _mailSettings = options.Value;
            _configuration = configuration;
        }

        public string GenerateMailTemplate(dynamic data, MailType mailType, string mailBody = "")
        {
            var date = DateTime.Now;
            string templatePath = Path.Combine(Directory.GetCurrentDirectory(), "HtmlTemplates", "mail-text.html");
            var replacedElements = new Dictionary<string, dynamic>();
            replacedElements.Add("{date}", date.ToString("dd.MM.yyyy"));

            switch (mailType)
            {
                case MailType.RecoveryPassword:
                    templatePath = Path.Combine(Directory.GetCurrentDirectory(), "HtmlTemplates", "forget-password.html");
                    var endpoint = _configuration["Endpoint:Andress"] + $"auth/recovery-password?tkn={data.ForgetPasswordToken}";
                    replacedElements.Add("{btnUrl}", endpoint);
                    break;
            }

            string tempHtml = File.ReadAllText(templatePath);
            StringBuilder replace = new StringBuilder();
            foreach (var item in replacedElements)
            {
                replace.Append(item.Value);
                tempHtml = tempHtml.Replace(item.Key, replace.ToString());
                replace.Clear();
            }
            return tempHtml;
        }
        public MailRequestModel ForgetPasswordMail(User user, MailType mailType)
        {
            MailRequestModel mailRequest = new MailRequestModel()
            {
                Body = GenerateMailTemplate(user, mailType),
                Subject = "Şifrə Bərpası",
                ToEmail = user.Email,
            };
            return mailRequest;
        }
        public async Task SendMailAsync(dynamic data, MailType mailType, string attachment = null)
        {

            var builder = new BodyBuilder();

            MailRequestModel mailRequest = new MailRequestModel();
            mailRequest = ForgetPasswordMail(data, mailType);


            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Address);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            email.From.Add(MailboxAddress.Parse(_mailSettings.Address));


            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);

            smtp.Disconnect(true);
        }
    }

}
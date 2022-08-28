using System;
using System.Threading.Tasks;
using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.Auth;
using DataService.dtos.User;
using DataService.Services.mail_manager;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Shared.Exceptions;
using Shared.Jwt;
using Shared.Messages;
using Shared.Results;

namespace DataService.Services
{
    public interface IAuthService
    {
        Task<User> Register(AuthRegisterDto registerDto);
        Task<UserDto> Login(AuthLoginDto loginDto);
        Task<IDataResult<UserDto>> CheckToken(string token);
        Task<IResult> ForgetPassword(AuthForgetPasswordDto forgetPasswordDto);
        Task<IResult> RecoveryPassword(AuthRecoveryPasswordDto recoveryPasswordDto);
    }
    public class AuthService : IAuthService
    {
        private IMapper _mapper;
        private AppDbContext _context;
        private readonly IConfiguration _conf;
        private IMailService _mailService;
        public AuthService(IMapper mapper, AppDbContext context, IConfiguration conf, IMailService mailService)
        {
            _mapper = mapper;
            _context = context;
            _conf = conf;
            _mailService = mailService;
        }

        public async Task<User> Register(AuthRegisterDto registerDto)
        {
            var user = _mapper.Map<AuthRegisterDto, User>(registerDto);

            bool checkMail = await _context.Users.AnyAsync(u => u.Email == registerDto.Email);
            if (checkMail) throw new HttpException(409, "Bu e-poçt artıq mövcuddur");

            user.Password = CryptoHelper.Crypto.HashPassword(user.Password);
            var key = _conf["Jwt:key"];

            user.Token = JwtAuthenticationManager.GenerateJwtToken(key, user.Email, _conf["Jwt:Issuer"], "User");
            user.Role = "User";

            user.UserRoleId = 2;

            await _context.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<IResult> ForgetPassword(AuthForgetPasswordDto forgetPasswordDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == forgetPasswordDto.Email);
            if (user == null) throw new HttpException(404, "Elektron poçt tapılmadı");
            user.ForgetPasswordToken = Guid.NewGuid().ToString();
            await _context.SaveChangesAsync();
            await _mailService.SendMailAsync(user, MailType.RecoveryPassword);

            return new Result(Message.Success);
        }



        public async Task<IDataResult<UserDto>> CheckToken(string token)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.ForgetPasswordToken == token);
            var dto = _mapper.Map<User, UserDto>(user!);
            return new DataResult<UserDto>(data: dto, message: Message.Success);
        }

        public async Task<UserDto> Login(AuthLoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == loginDto.Mail);
            if (user != null && CryptoHelper.Crypto.VerifyHashedPassword(user.Password, loginDto.Password))
            {
                var key = _conf["Jwt:key"];

                user.Token = JwtAuthenticationManager.GenerateJwtToken(key, user.Email!, _conf["Jwt:Issuer"], user.Role!);
                await _context.SaveChangesAsync();
                var dto = _mapper.Map<User, UserDto>(user!);

                return dto;
            }
            else
            {
                throw new HttpException(404, message: Message.UserNotFound);
            }

        }

        public async Task<IResult> RecoveryPassword(AuthRecoveryPasswordDto recoveryPasswordDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.ForgetPasswordToken == recoveryPasswordDto.ForgetPasswordToken);
            if (user == null) throw new HttpException(404, "Token tapılmadı");
            user.Password = CryptoHelper.Crypto.HashPassword(recoveryPasswordDto.Password);
            user.ForgetPasswordToken = null;
            await _context.SaveChangesAsync();

            return new Result(Message.Success);
        }
    }

}
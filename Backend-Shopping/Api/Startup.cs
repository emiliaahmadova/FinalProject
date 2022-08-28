using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using Api.Extensions;
using DataService.Services;
using DataService.Services.mail_manager;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace Api
{
    public class Startup
    {
        readonly string AllowSpecificOrigins = "_AllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddApiVersioning();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
            });

            services.SetCors(Configuration, AllowSpecificOrigins);

            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));

            services.AddAppDbContext(Configuration.GetConnectionString("Default"));

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped(typeof(IService<dynamic, dynamic, dynamic, dynamic>), typeof(Service<dynamic, dynamic, dynamic, dynamic>));

            services.LoadMyServices();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api v1"));
            }
            var wsOptions = new WebSocketOptions { KeepAliveInterval = TimeSpan.FromSeconds(120) };
            app.UseWebSockets(wsOptions);

            app.UseCors(AllowSpecificOrigins);


            app.UseHttpsRedirection();

            app.UseRouting();


            app.UseAuthorization();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Configuration["FilesPath:Storage"]),
                RequestPath = new PathString("/Storage"),
            });



            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                // endpoints.MapConnectionHandler<W>("/send")
            });

            //     app.Use(async (context, next) =>
            //    {
            //        if (context.Request.Path == "/send")
            //        {
            //            if (context.WebSockets.IsWebSocketRequest)
            //            {
            //                using (WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync())
            //                {
            //                    await Send(context, webSocket);
            //                }
            //            }
            //            else
            //            {
            //                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            //            }
            //        }
            //    });
        }
        private async Task Send(HttpContext context, WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            while (!result.CloseStatus.HasValue)
            {
                await webSocket.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);

                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            }
            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
        }
    }
}

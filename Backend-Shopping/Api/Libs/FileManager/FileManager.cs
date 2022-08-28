using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Api.Libs.FileManager
{
    public interface IFileManager
    {
        string Upload(IFormFile file, string savePath = "", string newName = null);
        Task<string> UploadAsync(IFormFile file, string savePath = "", string newName = null);
        void Delete(string deletedPath);
    }

    public class FileManager : IFileManager
    {
        private IConfiguration _configuration;

        public FileManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Delete(string deletedPath)
        {
            string path;
            string removePath = deletedPath.Split('/')[2];
            path = Path.Combine(_configuration["FilesPath:Storage"], "Uploads/", removePath);
            if (File.Exists(path))
            {
                File.Delete(path);
            }

        }

        public string Upload(IFormFile file, string savePath, string newName = null)
        {
            var folderName = Path.Combine("Uploads", savePath);
            var pathToSave = Path.Combine(_configuration["FilesPath:Storage"], folderName);

            if (!Directory.Exists(pathToSave))
                Directory.CreateDirectory(pathToSave);
            var list = file.FileName.Split('.');

            string fileName;

            if (newName == null)
                fileName = Guid.NewGuid() + "." + list[^1];
            else
                fileName = newName + "." + list[^1];
            var fullPath = Path.Combine(pathToSave, fileName);
            var dbPath = Path.Combine("Storage", folderName, fileName).Replace("\\", "/");

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return dbPath;
        }

        public async Task<string> UploadAsync(IFormFile file, string savePath, string newName = null)
        {
            var folderName = Path.Combine("Uploads", savePath);
            var pathToSave = Path.Combine(_configuration["FilesPath:Storage"], folderName);

            if (!Directory.Exists(pathToSave))
                Directory.CreateDirectory(pathToSave);
            var list = file.FileName.Split('.');

            string fileName;

            if (newName == null)
                fileName = Guid.NewGuid() + "." + list[^1];
            else
                fileName = newName + "." + list[^1];
            var fullPath = Path.Combine(pathToSave, fileName);
            var dbPath = Path.Combine("Storage", folderName, fileName).Replace("\\", "/");

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return dbPath;
        }

    }
}
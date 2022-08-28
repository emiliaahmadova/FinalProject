using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using DataService.Data;
using Microsoft.EntityFrameworkCore;
using Shared.Exceptions;
using Shared.Messages;
using Shared.Pagination;
using Shared.Results;

namespace DataService.Services
{
    public interface IService<TEntity, TDto, TCreateDto, TUpdateDto> where TEntity : class
    {
        Task<IDataResult<IEnumerable<TDto>>> GetAllAsync(Pagination pagination, List<TEntity> includedData = null);
        Task<IDataResult<IEnumerable<TDto>>> GetAllWithIncludeAsync(List<Expression<Func<TEntity, object>>> includeItems, Pagination pagination);
        Task<IDataResult<TDto>> GetByIdAsync(int id, TEntity entity = null);
        Task<IDataResult<TDto>> CreateAsync(TCreateDto dto);
        Task<IDataResult<IEnumerable<TDto>>> WhereAsync(Expression<Func<TEntity, bool>> predicate, Pagination pagination);
        DataResult<TDto> Update(TUpdateDto input);
        Task<DataResult<TDto>> UpdateAsync(TUpdateDto input);
        IResult Remove(int id);
        int GetCount();
    }
    public class Service<TEntity, TDto, TCreateDto, TUpdateDto> : IService<TEntity, TDto, TCreateDto, TUpdateDto> where TEntity : class
    {
        protected readonly AppDbContext _context;
        private readonly DbSet<TEntity> _dbSet;
        protected IMapper _mapper;

        public Service(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
            _mapper = mapper;

        }


        public virtual async Task<IDataResult<TDto>> CreateAsync(TCreateDto dto)
        {
            var input = _mapper.Map<TCreateDto, TEntity>(dto);
            await _dbSet.AddAsync(input);
            await _context.SaveChangesAsync();
            var data = _mapper.Map<TEntity, TDto>(input);
            return new DataResult<TDto>(data: data, message: Message.Created, null);
        }

        public virtual async Task<IDataResult<IEnumerable<TDto>>> GetAllAsync(Pagination pagination, List<TEntity> includedData = null)
        {
            int count = _dbSet.Count();
            dynamic data = null;

            if (includedData == null)
            {
                data = await _dbSet.Skip((pagination.PageNumber - 1) * pagination.PageSize)
                         .Take(pagination.PageSize)
                         .ToListAsync();
            }
            else
            {
                data = includedData;
            }
            var dto = _mapper.Map<IEnumerable<TEntity>, IEnumerable<TDto>>(data);
            return new DataResult<IEnumerable<TDto>>(data: dto, message: Message.Success, count);
        }

        public async Task<IDataResult<IEnumerable<TDto>>> GetAllWithIncludeAsync(List<Expression<Func<TEntity, object>>> includeItems, Pagination pagination)
        {
            var query = _context.Set<TEntity>().AsQueryable();
            foreach (var item in includeItems)
            {
                query = query.Include(item);
            }
            int count = query.Count();
            var data = await query.Skip((pagination.PageNumber - 1) * pagination.PageSize)
                              .Take(pagination.PageSize)
                              .ToListAsync();
            var dto = _mapper.Map<IEnumerable<TEntity>, IEnumerable<TDto>>(data);
            return new DataResult<IEnumerable<TDto>>(data: dto, message: Message.Success, count);
        }

        public virtual async Task<IDataResult<TDto>> GetByIdAsync(int id, TEntity entity = null)
        {
            TEntity data = null;

            if (entity == null)
            {
                data = await _dbSet.FindAsync(id);
            }
            else
            {
                data = entity;
            }
            var dto = _mapper.Map<TEntity, TDto>(data!);
            if (dto == null) return new DataResult<TDto>(data: dto, exception: new HttpException(404, Message.NotFound));
            return new DataResult<TDto>(data: dto, message: Message.Success, null);

        }

        public int GetCount()
        {
            throw new NotImplementedException();
        }

        public IResult Remove(int id)
        {
            var entity = GetById(id);
            if (entity == null) return new Result(exception: new HttpException(404, Message.NotFound));

            _dbSet.Remove(entity);
            _context.SaveChanges();
            return new Result(message: Message.Deleted);
        }
        private TEntity GetById(int id)
        {
            return _dbSet.Find(id)!;
        }

        public virtual DataResult<TDto> Update(TUpdateDto input)
        {
            var dto = _mapper.Map<TUpdateDto, TEntity>(input);
            _context.Entry(dto).State = EntityState.Modified;
            _context.SaveChanges();
            var data = _mapper.Map<TEntity, TDto>(dto);
            return new DataResult<TDto>(data: data, message: Message.Success, null);
        }

        public async Task<IDataResult<IEnumerable<TDto>>> WhereAsync(Expression<Func<TEntity, bool>> predicate, Pagination pagination)
        {
            var allData = await _dbSet.Where(predicate).ToListAsync();
            int count = _dbSet.Count();
            var data = allData.Skip((pagination.PageNumber - 1) * pagination.PageSize)
                         .Take(pagination.PageSize);
            var dto = _mapper.Map<IEnumerable<TEntity>, IEnumerable<TDto>>(data);
            return new DataResult<IEnumerable<TDto>>(data: dto, message: Message.Success, count);
        }

        public async virtual Task<DataResult<TDto>> UpdateAsync(TUpdateDto input)
        {
            var dto = _mapper.Map<TUpdateDto, TEntity>(input);
            _context.Entry(dto).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            var data = _mapper.Map<TEntity, TDto>(dto);
            return new DataResult<TDto>(data: data, message: Message.Success, null);
        }
    }

}
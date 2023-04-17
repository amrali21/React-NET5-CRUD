using AutoMapper;
using CRUD_Design.Contracts;
using CRUD_Design.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUD_Design.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class MemoController: ControllerBase
    {
        private readonly IMemoGenericRepository _memoRepository;
        private readonly IMapper _mapper;

        public MemoController(IMemoGenericRepository memosRepository, IMapper mapper)
        {
            _memoRepository = memosRepository;
            _mapper = mapper;
        }

        // GET: api/Countries
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Memo>>> GetMemos()
        {
            var countries = await _memoRepository.GetAllAsync();
            return Ok(countries);
        }

        // PUT: api/Countries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMemo(Memo memo)
        {

            if (await _memoRepository.GetAsync(memo.Id) == null)
                return NotFound();

            try
            {
                await _memoRepository.UpdateAsync(memo);
            }
            catch (DbUpdateConcurrencyException)
            {
             
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Memo>> PostMemo(CreateMemoDTO memoDto)
        {
            var mapped = _mapper.Map<Memo>(memoDto);

            if (mapped == null) return BadRequest();

            var memo = await _memoRepository.AddAsync(mapped);
            return Ok(memo);
        }

        // DELETE: api/Countries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMemo(int id)
        {
            var memo = await _memoRepository.GetAsync(id);
            if (memo == null)
            {
                return NotFound();
            }

            await _memoRepository.DeleteAsync(id);

            return NoContent();
        }
    }

}

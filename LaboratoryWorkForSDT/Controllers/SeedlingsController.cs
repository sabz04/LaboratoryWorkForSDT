using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LaboratoryWorkForSDT.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LaboratoryWorkForSDT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedlingsController : ControllerBase
    {

        private SeedlingsContext _db;

        public SeedlingsController(SeedlingsContext seedlingsContext)
        {
            _db = seedlingsContext;
        }

        // GET: api/<SeedlingsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seedlings>>> Get()
        {
            return await _db.Seedlings.ToListAsync();
        }

        // GET api/<SeedlingsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Seedlings>> Get(int id)
        {
            Seedlings seedlings = await _db.Seedlings.FirstOrDefaultAsync(x => x.Id == id);

            if (seedlings == null)
                return NotFound();
            return new ObjectResult(seedlings);
        }

        // POST api/<SeedlingsController>
        [HttpPost]
        public async Task<ActionResult<Seedlings>> Post(Seedlings seedlings)
        {

            if (seedlings == null)
            {
                return BadRequest();
            }

            _db.Seedlings.Add(seedlings);
            await _db.SaveChangesAsync();
            return Ok(seedlings);

        }

        // PUT api/<SeedlingsController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Seedlings>> Put(Seedlings seedlings)
        {

            if (seedlings == null)
            {
                return BadRequest();
            }

            if (!_db.Seedlings.Any(x => x.Id == seedlings.Id))
            {
                return NotFound();
            }

            _db.Update(seedlings);
            await _db.SaveChangesAsync();
            return Ok(seedlings);


        }

        // DELETE api/<SeedlingsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Seedlings>> Delete(int id)
        {

            Seedlings seedlings = _db.Seedlings.FirstOrDefault(x => x.Id == id);

            if (seedlings == null)
            {
                return NotFound();
            }

            _db.Seedlings.Remove(seedlings);
            await _db.SaveChangesAsync();
            return Ok(seedlings);

        }
    }
}

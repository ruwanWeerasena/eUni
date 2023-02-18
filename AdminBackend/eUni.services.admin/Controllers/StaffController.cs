using eUni.data.Repositories;
using eUni.data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("[controller]")]
public class StaffController : ControllerBase
{
    private readonly IStaffRepository _staffRepository;

    public StaffController(IStaffRepository staffRepository){
        _staffRepository = staffRepository;
    }

    [HttpGet()]
    //[ProducesResponseType(201, Type = typeof(CartDetail))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetAllStaff()
    {
        return Ok(await _staffRepository.GetAllStaffAsync());
    }


    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetStaff(int id)
    {
        var staff =  await _staffRepository.GetStaffByIdAsync(id);

        if (staff is null)
        {
            return NotFound();
        }

        return Ok(staff);
    }

    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] Staff b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Staff? addedStaff = await _staffRepository.CreateStaffAsync(b);

        Staff? isadded = await _staffRepository.GetStaffByIdAsync(b.StaffId);

        if (isadded is null)
        {
            return BadRequest("Repository failed to add staff");
        }
        else
        {
            return Ok(isadded);
        }
    }

    [HttpPut("{staffId:int}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int staffId, [FromBody] Staff b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Staff? existing = await  _staffRepository.GetStaffByIdAsync(staffId);


        if (existing is null)
        {
            return NotFound();
        }

        

        Staff? updated =  await _staffRepository.UpdateStaffAsync(staffId,b);

        Staff? isupdated = await  _staffRepository.GetStaffByIdAsync(staffId);

        return Ok(isupdated);
    }


    [HttpDelete("{staffId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int staffId)
    {
        Staff? existing = await _staffRepository.GetStaffByIdAsync(staffId);

        if (existing is null)
        {
            return NotFound();
        }

        bool? deleted = await _staffRepository.DeletStaffAsync(staffId);

        if (deleted.HasValue && deleted.Value)
        {
            return new NoContentResult();
        }
        else
        {
            return BadRequest($"staff {staffId} was found but failed to delete");
        }
    }
   
}


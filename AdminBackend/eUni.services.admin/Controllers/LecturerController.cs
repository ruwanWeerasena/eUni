using eUni.data.Repositories;
using eUni.data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("[controller]")]
public class LecturerController : ControllerBase
{
    private readonly ILecturerRepository _lecturerrepository;

    public LecturerController(ILecturerRepository lecturerepository){
        _lecturerrepository = lecturerepository;
    }

    [HttpGet()]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetAllLectures()
    {
        
        return Ok(await _lecturerrepository.GetLecturersAsync());
    }


    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> get(int id)
    {
        var lecturer =  await _lecturerrepository.GetLecturerByIdAsync(id);

        if (lecturer is null)
        {
            return NotFound();
        }

        return Ok(lecturer);
    }

    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] Lecturer b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Lecturer? addedlecturer = await _lecturerrepository.CreateAsync(b);

        Lecturer? isadded = await _lecturerrepository.GetLecturerByIdAsync(b.LecturerId);

        if (isadded is null)
        {
            return BadRequest("Repository failed to add Lecturer");
        }
        else
        {
            return Ok(isadded);
        }
    }

    [HttpPut("{LecturerId:int}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int LecturerId, [FromBody] Lecturer b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Lecturer? existing = await  _lecturerrepository.GetLecturerByIdAsync(LecturerId);


        if (existing is null)
        {
            return NotFound();
        }

        

        Lecturer? updated =  await _lecturerrepository.updateAsync(LecturerId,b);

        Lecturer? isupdated = await  _lecturerrepository.GetLecturerByIdAsync(LecturerId);

        return Ok(isupdated);
    }


    [HttpDelete("{LecturerId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int LecturerId)
    {
        Lecturer? existing = await _lecturerrepository.GetLecturerByIdAsync(LecturerId);

        if (existing is null)
        {
            return NotFound();
        }

        bool? deleted = await _lecturerrepository.DeletAsync(LecturerId);
        if (deleted.HasValue && deleted.Value)
        {
            return new NoContentResult();
        }
        else
        {
            return BadRequest($"Lecturer {LecturerId} was found but failed to delete");
        }
    }
   
}


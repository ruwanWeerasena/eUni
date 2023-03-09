using eUni.data.Repositories;
using eUni.data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("[controller]")]
public class StudentController : ControllerBase
{
    private readonly IStudentRepository _studentrepository;

    public StudentController(IStudentRepository studentrepository){
        _studentrepository = studentrepository;
    }

    [HttpGet()]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetAllStudent()
    {
        Thread.Sleep(2000);
        return Ok(await _studentrepository.GetStudentsAsync());
    }


    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Get(int id)
    {
        var student =  await _studentrepository.GetStudentByIdAsync(id);

        if (student is null)
        {
            return NotFound();
        }
        Thread.Sleep(2000);
        return Ok(student);
    }

    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] Student b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Student? addedStudent = await _studentrepository.CreateAsync(b);

        Student? isadded = await _studentrepository.GetStudentByIdAsync(b.StudentId);
        Thread.Sleep(2000);
        if (isadded is null)
        {
            return BadRequest("Repository failed to add staff");
        }
        else
        {
            return Ok(isadded);
        }
    }

    [HttpPut("{StudentId:int}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int studentid, [FromBody] Student b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Student? existing = await  _studentrepository.GetStudentByIdAsync(studentid);


        if (existing is null)
        {
            return NotFound();
        }

        

        Student? updated =  await _studentrepository.updateAsync(studentid,b);

        Student? isupdated = await  _studentrepository.GetStudentByIdAsync(studentid);
        Thread.Sleep(2000);
        return Ok(isupdated);
    }


    [HttpDelete("{StudentId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int StudentId)
    {
        Student? existing = await _studentrepository.GetStudentByIdAsync(StudentId);

        if (existing is null)
        {
            return NotFound();
        }

        bool? deleted = await _studentrepository.DeletAsync(StudentId);
        System.Console.WriteLine(deleted);
        Thread.Sleep(2000);
        if (deleted.HasValue && deleted.Value)
        {
            return new NoContentResult();
        }
        else
        {
            return BadRequest($"staff {StudentId} was found but failed to delete");
        }
    }
   
}


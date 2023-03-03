using eUni.data.Entities;
using AutoMapper;
using eUni.data.Repositories;
using eUni.services.admin.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("[controller]")]
//  [Authorize]
public class EnrollmentController : ControllerBase
{
    private readonly IEnrollmentRepository _enrollmentRepository;
    private readonly IMapper _mapper;

    public EnrollmentController(IEnrollmentRepository enrollmentRepository, IMapper mapper){
        _enrollmentRepository = enrollmentRepository;
        _mapper = mapper;
    }

    [HttpGet()]
    //[ProducesResponseType(201, Type = typeof(CartDetail))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetEnrollments()
    {
        var list = await _enrollmentRepository.GetEnrollmentsAsync();
        var mappedList = list.Select(e => _mapper.Map<EnrollmentViewModel>(e)).ToList();

        Thread.Sleep(3000);
        return Ok(mappedList);
    }


    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetEnrollmentsByStudentId(int id)
    {
        var list =  await _enrollmentRepository.GetEnrollmentsByStudentIdAsync(id);
        var mappedList = list.Select(e => _mapper.Map<EnrollmentViewModel>(e)).ToList();

  
        return Ok(mappedList);
    }



    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] Enrollment e)
    {
        if (e is null)
        {
            return BadRequest();
        }
        Enrollment? checkexisting = await _enrollmentRepository.GetEnrollmentByStudentandBatchAsync((int)e.StudentId,(int)e.BatchId);

        if(checkexisting is null)
        {
            Enrollment? addedEnrollement = await _enrollmentRepository.CreateAsync(e);
            Enrollment? isadded = await _enrollmentRepository.GetEnrollmentByIdAsync(e.EnrollmentId);
            if (isadded is null)
            {
                return BadRequest("Repository failed to add enrollmet");
            }
            else
            {
                return Ok(isadded);
            }

        }else
        {
            return BadRequest("This Student already enrolled for this batch");
        }


    }

    [HttpPost("bulk")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> CreateBulkTransfer([FromBody] Enrollment[] e)
    {
        if (e is null)
        {
            return BadRequest();
        }

        bool isadded = await _enrollmentRepository.CreateMultipleAsync(e);


        if (isadded)
        {
            return Ok(isadded);
        }
        else
        {
            return BadRequest("Repository failed to add enrollmet");
        }
    }

    // [HttpPut("{BatchId:int}")]
    // [ProducesResponseType(204)]
    // [ProducesResponseType(400)]
    // [ProducesResponseType(404)]
    // public async Task<IActionResult> Update(int BatchId, [FromBody] Batch b)
    // {
    //     if (b is null)
    //     {
    //         return BadRequest();
    //     }

    //     Batch? existing = await  _batchRepository.GetBatcheByIdAsync(BatchId);


    //     if (existing is null)
    //     {
    //         return NotFound();
    //     }

        

    //     Batch? updated =  await _batchRepository.updateAsync(BatchId,b);

    //     Batch? isupdated = await  _batchRepository.GetBatcheByIdAsync(BatchId);

    //     return Ok(isupdated);
    // }


    // [HttpDelete("{BatchId}")]
    // [ProducesResponseType(204)]
    // [ProducesResponseType(400)]
    // [ProducesResponseType(404)]
    // public async Task<IActionResult> Delete(int BatchId)
    // {
    //     Batch? existing = await _batchRepository.GetBatcheByIdAsync(BatchId);

    //     if (existing is null)
    //     {
    //         return NotFound();
    //     }

    //     bool? deleted = await _batchRepository.DeletAsync(BatchId);

    //     if (deleted.HasValue && deleted.Value)
    //     {
    //         return new NoContentResult();
    //     }
    //     else
    //     {
    //         return BadRequest($"Batch {BatchId} was found but failed to delete");
    //     }
    // }
   
}

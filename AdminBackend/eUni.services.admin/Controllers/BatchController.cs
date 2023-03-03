using AutoMapper;
using eUni.data.Entities;
using eUni.data.Repositories;
using eUni.services.admin.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("[controller]")]
//  [Authorize]
public class BatchController : ControllerBase
{
    private readonly IBatchRepository _batchRepository;
    private readonly IMapper _mapper;

    public BatchController(IBatchRepository branchRepository, IMapper mapper){
        _batchRepository = branchRepository;
        _mapper = mapper;
    }

    [HttpGet()]
    //[ProducesResponseType(201, Type = typeof(CartDetail))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetBatches()
    {
        var list = await _batchRepository.GetBatchesAsync();
        var mappedList = list.Select(s => _mapper.Map<BatchViewModel>(s)).ToList();
        Thread.Sleep(2000);
        return Ok(mappedList);
    }


    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetBatch(int id)
    {
        var branch =  await _batchRepository.GetBatcheByIdAsync(id);

        if (branch is null)
        {
            return NotFound();
        }

        return Ok(branch);
    }

     [HttpGet("Course/{CourseId}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetBatchByCourseId(int CourseId)
    {
        var batchlist =  await _batchRepository.GetBatchesByCourseIdAsync(CourseId);

       

        return Ok(batchlist);
    }

    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] Batch b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Batch? addedbranch = await _batchRepository.CreateAsync(b);

        Batch? isadded = await _batchRepository.GetBatcheByIdAsync(b.BatchId);

        if (isadded is null)
        {
            return BadRequest("Repository failed to add branch");
        }
        else
        {
            return Ok(isadded);
        }
    }

    [HttpPut("{batchId:int}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int batchId, [FromBody] Batch b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Batch? existing = await  _batchRepository.GetBatcheByIdAsync(batchId);


        if (existing is null)
        {
            return NotFound();
        }

        

        Batch? updated =  await _batchRepository.updateAsync(batchId,b);

        Batch? isupdated = await  _batchRepository.GetBatcheByIdAsync(batchId);

        return Ok(isupdated);
    }


    [HttpDelete("{batchId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int batchId)
    {
        Batch? existing = await _batchRepository.GetBatcheByIdAsync(batchId);

        if (existing is null)
        {
            return NotFound();
        }

        bool? deleted = await _batchRepository.DeletAsync(batchId);

        if (deleted.HasValue && deleted.Value)
        {
            return new NoContentResult();
        }
        else
        {
            return BadRequest($"Batch {batchId} was found but failed to delete");
        }
    }
   
}

using AutoMapper;
using eUni.data.Entities;
using eUni.data.Repositories;
using eUni.services.admin.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("timeShedule")]
//  [Authorize]
public class BatchTimeSheduleController : ControllerBase
{
    private readonly IBatchTimeSheduleRepository _batchTimeSheduleRepository;
    private readonly IMapper _mapper;

    public BatchTimeSheduleController(IBatchTimeSheduleRepository batchTimeSheduleRepository, IMapper mapper){
        _batchTimeSheduleRepository = batchTimeSheduleRepository;
        _mapper = mapper;
    }

    [HttpGet()]
    //[ProducesResponseType(201, Type = typeof(CartDetail))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetBatchTimeShedules()
    {
        var list = await _batchTimeSheduleRepository.GetBatchTimeShedulesAsync();

        return Ok(list);
    }


    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetBatchTimeShedule(int id)
    {
        var branchTimeShedule =  await _batchTimeSheduleRepository.GetBatchTimeSheduleByIdAsync(id);

        if (branchTimeShedule is null)
        {
            return NotFound();
        }

        return Ok(branchTimeShedule);
    }

    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] BatchTimeShedule b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        BatchTimeShedule? addedbranchTimeShedule = await _batchTimeSheduleRepository.CreateAsync(b);

        BatchTimeShedule? isadded = await _batchTimeSheduleRepository.GetBatchTimeSheduleByIdAsync(b.BatchTimeSheduleId);

        if (isadded is null)
        {
            return BadRequest("Repository failed to add branch");
        }
        else
        {
            return Ok(isadded);
        }
    }

    [HttpPut("{batchTimeSheduleId:int}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int batchTimeSheduleId, [FromBody] BatchTimeShedule b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        BatchTimeShedule? existing = await  _batchTimeSheduleRepository.GetBatchTimeSheduleByIdAsync(batchTimeSheduleId);


        if (existing is null)
        {
            return NotFound();
        }

        

        BatchTimeShedule? updated =  await _batchTimeSheduleRepository.updateAsync(batchTimeSheduleId,b);

        BatchTimeShedule? isupdated = await  _batchTimeSheduleRepository.GetBatchTimeSheduleByIdAsync(batchTimeSheduleId);

        return Ok(isupdated);
    }


    [HttpDelete("{batchId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int batchId)
    {
        BatchTimeShedule? existing = await _batchTimeSheduleRepository.GetBatchTimeSheduleByIdAsync(batchId);

        if (existing is null)
        {
            return NotFound();
        }

        bool? deleted = await _batchTimeSheduleRepository.DeletAsync(batchId);

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

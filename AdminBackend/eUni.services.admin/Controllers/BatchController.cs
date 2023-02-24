using eUni.data.Entities;
using eUni.data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("[controller]")]
//  [Authorize]
public class BatchController : ControllerBase
{
    private readonly IBatchRepository _batchRepository;

    public BatchController(IBatchRepository branchRepository){
        _batchRepository = branchRepository;
    }

    [HttpGet()]
    //[ProducesResponseType(201, Type = typeof(CartDetail))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetBatches()
    {
        var list = await _batchRepository.GetBatchesAsync();
        Thread.Sleep(3000);
        return Ok(list);
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

    [HttpPut("{BatchId:int}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int BatchId, [FromBody] Batch b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Batch? existing = await  _batchRepository.GetBatcheByIdAsync(BatchId);


        if (existing is null)
        {
            return NotFound();
        }

        

        Batch? updated =  await _batchRepository.updateAsync(BatchId,b);

        Batch? isupdated = await  _batchRepository.GetBatcheByIdAsync(BatchId);

        return Ok(isupdated);
    }


    [HttpDelete("{BatchId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int BatchId)
    {
        Batch? existing = await _batchRepository.GetBatcheByIdAsync(BatchId);

        if (existing is null)
        {
            return NotFound();
        }

        bool? deleted = await _batchRepository.DeletAsync(BatchId);

        if (deleted.HasValue && deleted.Value)
        {
            return new NoContentResult();
        }
        else
        {
            return BadRequest($"Batch {BatchId} was found but failed to delete");
        }
    }
   
}

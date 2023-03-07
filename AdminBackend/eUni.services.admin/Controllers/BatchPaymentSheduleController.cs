using AutoMapper;
using eUni.data.Entities;
using eUni.data.Repositories;
using eUni.services.admin.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("paymentShedule")]
//  [Authorize]
public class BatchPaymentSheduleController : ControllerBase
{
    private readonly IBatchPaymentSheduleRepository _batchPaymentSheduleRepository;
    private readonly IMapper _mapper;

    public BatchPaymentSheduleController(IBatchPaymentSheduleRepository batchPaymentSheduleRepository, IMapper mapper){
        _batchPaymentSheduleRepository = batchPaymentSheduleRepository;
        _mapper = mapper;
    }

    [HttpGet()]
    //[ProducesResponseType(201, Type = typeof(CartDetail))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetBatchPaymentShedules()
    {
        var list = await _batchPaymentSheduleRepository.GetBatchPaymentShedulesAsync();

        return Ok(list);
    }


    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetBatchPaymentShedule(int id)
    {
        var branchPaymentShedule =  await _batchPaymentSheduleRepository.GetBatchPaymentSheduleByIdAsync(id);

        if (branchPaymentShedule is null)
        {
            return NotFound();
        }

        return Ok(branchPaymentShedule);
    }

    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] BatchPaymentShedule b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        BatchPaymentShedule? addedbranchPaymentShedule = await _batchPaymentSheduleRepository.CreateAsync(b);

        BatchPaymentShedule? isadded = await _batchPaymentSheduleRepository.GetBatchPaymentSheduleByIdAsync(b.BatchPaymentSheduleId);

        if (isadded is null)
        {
            return BadRequest("Repository failed to add branch");
        }
        else
        {
            return Ok(isadded);
        }
    }

    [HttpPut("{batchPaymentSheduleId:int}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int batchPaymentSheduleId, [FromBody] BatchPaymentShedule b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        BatchPaymentShedule? existing = await  _batchPaymentSheduleRepository.GetBatchPaymentSheduleByIdAsync(batchPaymentSheduleId);


        if (existing is null)
        {
            return NotFound();
        }

        

        BatchPaymentShedule? updated =  await _batchPaymentSheduleRepository.updateAsync(batchPaymentSheduleId,b);

        BatchPaymentShedule? isupdated = await  _batchPaymentSheduleRepository.GetBatchPaymentSheduleByIdAsync(batchPaymentSheduleId);

        return Ok(isupdated);
    }


    [HttpDelete("{batchId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int batchId)
    {
        BatchPaymentShedule? existing = await _batchPaymentSheduleRepository.GetBatchPaymentSheduleByIdAsync(batchId);

        if (existing is null)
        {
            return NotFound();
        }

        bool? deleted = await _batchPaymentSheduleRepository.DeletAsync(batchId);

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

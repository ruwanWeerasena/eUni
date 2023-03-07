using AutoMapper;
using eUni.data.Entities;
using eUni.data.Repositories;
using eUni.services.admin.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("discount")]
//  [Authorize]
public class BatchDiscountController : ControllerBase
{
    private readonly IBatchDiscountRepository _batchDiscountRepository;
    private readonly IMapper _mapper;

    public BatchDiscountController(IBatchDiscountRepository batchDiscountRepository, IMapper mapper){
        _batchDiscountRepository = batchDiscountRepository;
        _mapper = mapper;
    }

    [HttpGet()]
    //[ProducesResponseType(201, Type = typeof(CartDetail))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetAllPayments()
    {
        var list = await _batchDiscountRepository.GetBatchDiscountsAsync();

        return Ok(list);
    }


    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetBatchDiscountsById(int id)
    {
        var batchdiscount =  await _batchDiscountRepository.GetBatchDiscountsByIdAsync(id);

        if (batchdiscount is null)
        {
            return NotFound();
        }

        return Ok(batchdiscount);
    }

  
    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] BatchDiscount b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        BatchDiscount? added = await _batchDiscountRepository.CreateAsync(b);

        BatchDiscount? isadded = await _batchDiscountRepository.GetBatchDiscountsByIdAsync(b.BatchDiscountId);

        if (isadded is null)
        {
            return BadRequest("Repository failed to add batch discount");
        }
        else
        {
            return Ok(isadded);
        }
    }

    [HttpPut("{batchDiscountId:int}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int batchDiscountId, [FromBody] BatchDiscount b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        BatchDiscount? existing = await  _batchDiscountRepository.GetBatchDiscountsByIdAsync(batchDiscountId);


        if (existing is null)
        {
            return NotFound();
        }

        

        BatchDiscount? updated =  await _batchDiscountRepository.updateAsync(batchDiscountId,b);


        return Ok(updated);
    }


    [HttpDelete("{batchDiscountId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int batchDiscountId)
    {
        BatchDiscount? existing = await _batchDiscountRepository.GetBatchDiscountsByIdAsync(batchDiscountId);

        if (existing is null)
        {
            return NotFound();
        }

        bool? deleted = await _batchDiscountRepository.DeletAsync(batchDiscountId);

        if (deleted.HasValue && deleted.Value)
        {
            return new NoContentResult();
        }
        else
        {
            return BadRequest($"batchDiscountId {batchDiscountId} was found but failed to delete");
        }
    }
   
}

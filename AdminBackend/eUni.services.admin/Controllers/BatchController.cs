using eUni.data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("[controller]")]
// [Authorize]
public class BatchController : ControllerBase
{
    private readonly IBatchRepository _batchRepository;

    public BatchController(IBatchRepository batchRepository){
        _batchRepository = batchRepository;
    }

    [HttpGet()]
    //[ProducesResponseType(201, Type = typeof(CartDetail))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetBatches()
    {
        return Ok(await _batchRepository.GetBatchesAsync());
    }

   
}
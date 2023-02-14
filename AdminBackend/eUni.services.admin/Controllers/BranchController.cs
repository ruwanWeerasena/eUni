using eUni.data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("[controller]")]
public class BranchController : ControllerBase
{
    private readonly IBranchRepository _branchRepository;

    public BranchController(IBranchRepository branchRepository){
        _branchRepository = branchRepository;
    }

    [HttpGet()]
    //[ProducesResponseType(201, Type = typeof(CartDetail))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetBranches()
    {
        return Ok(await _branchRepository.GetBranchesAsync());
    }

   
}
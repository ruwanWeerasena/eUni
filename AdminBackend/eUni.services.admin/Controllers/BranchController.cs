using eUni.data.Repositories;
using eUni.data.Entities;
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
        var list = await _branchRepository.GetBranchesAsync();
        Thread.Sleep(3000);
        return Ok(list);
    }


    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetBranch(int id)
    {
        var branch =  await _branchRepository.GetBrancheByIdAsync(id);

        if (branch is null)
        {
            return NotFound();
        }

        return Ok(branch);
    }

    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] Branch b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Branch? addedbranch = await _branchRepository.CreateAsync(b);

        Branch? isadded = await _branchRepository.GetBrancheByIdAsync(b.BranchId);

        if (isadded is null)
        {
            return BadRequest("Repository failed to add branch");
        }
        else
        {
            return Ok(isadded);
        }
    }

    [HttpPut("{BranchId:int}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int BranchId, [FromBody] Branch b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Branch? existing = await  _branchRepository.GetBrancheByIdAsync(BranchId);


        if (existing is null)
        {
            return NotFound();
        }

        

        Branch? updated =  await _branchRepository.updateAsync(BranchId,b);

        Branch? isupdated = await  _branchRepository.GetBrancheByIdAsync(BranchId);

        return Ok(isupdated);
    }


    [HttpDelete("{BranchId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int BranchId)
    {
        Branch? existing = await _branchRepository.GetBrancheByIdAsync(BranchId);

        if (existing is null)
        {
            return NotFound();
        }

        bool? deleted = await _branchRepository.DeletAsync(BranchId);

        if (deleted.HasValue && deleted.Value)
        {
            return new NoContentResult();
        }
        else
        {
            return BadRequest($"Branch {BranchId} was found but failed to delete");
        }
    }
   
}


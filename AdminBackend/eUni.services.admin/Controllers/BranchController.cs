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
        Thread.Sleep(2000);
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

        Thread.Sleep(2000);

        if (isadded is null)
        {
            return BadRequest("Repository failed to add branch");
        }
        else
        {
            return Ok(isadded);
        }
    }

    [HttpPut("{branchId:int}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int branchId, [FromBody] Branch b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Branch? existing = await  _branchRepository.GetBrancheByIdAsync(branchId);


        if (existing is null)
        {
            return NotFound();
        }

        

        Branch? updated =  await _branchRepository.updateAsync(branchId,b);

        Branch? isupdated = await  _branchRepository.GetBrancheByIdAsync(branchId);

        return Ok(isupdated);
    }


    [HttpDelete("{branchId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int branchId)
    {
        Branch? existing = await _branchRepository.GetBrancheByIdAsync(branchId);

        if (existing is null)
        {
            return NotFound();
        }

        bool? deleted = await _branchRepository.DeletAsync(branchId);

        if (deleted.HasValue && deleted.Value)
        {
            return new NoContentResult();
        }
        else
        {
            return BadRequest($"Branch {branchId} was found but failed to delete");
        }
    }
   
}


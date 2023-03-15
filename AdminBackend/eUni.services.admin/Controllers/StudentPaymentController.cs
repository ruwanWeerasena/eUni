using eUni.data.Entities;
using AutoMapper;
using eUni.data.Repositories;
using eUni.services.admin.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("[controller]")]
//  [Authorize]
public class StudentPaymentController : ControllerBase
{
    private readonly IStudentPaymentRepository _studentpaymentRepository;

    public StudentPaymentController(IStudentPaymentRepository studentpaymentRepository, IMapper mapper){
        _studentpaymentRepository = studentpaymentRepository;
    }

    [HttpGet()]
    //[ProducesResponseType(201, Type = typeof(CartDetail))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetAll()
    {
        var list = await _studentpaymentRepository.GetStudentPayments();

        Thread.Sleep(3000);
        return Ok(list);
    }


    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetAllByStudentId(int id)
    {
        var list =  await _studentpaymentRepository.GetStudentPaymentsByStudentIdAsync(id);

        Thread.Sleep(2000);
        return Ok(list);
    }



    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] StudentPayment p)
    {
        if (p is null)
        {
            return BadRequest();
        }
        p.PaymentDate=DateTime.Today;

            StudentPayment? addedpayment = await _studentpaymentRepository.CreateAsync(p);
            StudentPayment? isadded = await _studentpaymentRepository.GetStudentPaymentsByIdAsync(p.PaymentId);
            if (isadded is null)
            {
                return BadRequest("Repository failed to add enrollmet");
            }
            else
            {
                return Ok(isadded);
            }

    


    }

   

   
}

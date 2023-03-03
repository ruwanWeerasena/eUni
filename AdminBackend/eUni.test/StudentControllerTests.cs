using eUni.data.Entities;
using eUni.data.Repositories;
using eUni.services.admin.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace eUni.test;

public class StudentControllerTests
{
    private readonly Mock<IStudentRepository> repositoryStub = new();

    //Unitofwork_Stateundertest_ExpectedBehaviour
    [Fact]
    public async Task Unexisting_Item_Should_Returns_NotFound()
    {
        //Arrange
        repositoryStub.Setup(repo => repo.GetStudentByIdAsync(It.IsAny<int>())).ReturnsAsync((Student)null);

        var sut = new StudentController(repositoryStub.Object);

        //Act
        var result = await sut.Get(It.IsAny<int>());

        //Assert
        //Assert.IsType<NotFoundResult>(result);

        result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task Select_Student_With_Existing_Id_Returns_Corresponding_Student()
    {
        //Arrange
        var expectedStudent = CreateRandomStudent(3);

        repositoryStub.Setup(repo => repo.GetStudentByIdAsync(It.IsAny<int>())).ReturnsAsync(expectedStudent);

        var sut = new StudentController(repositoryStub.Object);

        //Act
        var result = await sut.Get(It.IsAny<int>());

        //Assert

        var okResult = (result as OkObjectResult).Value;
        var selectedStudent = okResult as Student;

        //Noram Style
        // Assert.IsType<Student>(selectedStudent);
        // Assert.Equal(expectedStudent.Name, selectedStudent.Name);

        //Fluent Style
        selectedStudent.Should().BeEquivalentTo(expectedStudent, options => options.ComparingByMembers<Student>());
    }

    [Fact]
    public async Task Get_All_Students_Should_Return_Correct_List()
    {
        //Arrange
        var expectedStudents = new List<Student> {
                CreateRandomStudent(1),
                CreateRandomStudent(2),
                CreateRandomStudent(3)
            };

        repositoryStub.Setup(repo => repo.GetStudentsAsync()).ReturnsAsync(expectedStudents);

        //system under test
        var sut = new StudentController(repositoryStub.Object);

        //Act
        var result = await sut.GetAllStudent();

        //Assert
        var okResult = (result as OkObjectResult).Value;
        var selectedStudents = okResult as List<Student>;

        selectedStudents.Should().BeEquivalentTo(expectedStudents, options => options.ComparingByMembers<Student>());
    }

    [Fact]
    public async Task Insert_Student_Should_Click()
    {

    }


    private Student CreateRandomStudent(int id)
    {
        return new()
        {
            StudentId = id,
            Name = "Kusal Mendis",
            DateOfBirth = DateTime.Parse("1989-07-05"),
            Street = "12 Jude Mawatha",
            City = "Katubade",
            State = "Western",
            Email = "kusal@euni.com",
            Mobile = "0777675621"
        };
    }
}

import Employee from '../models/employee.model';

//create new Employee
export const newEmployee = async (body) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };
  let email = { email: body.email };
  let foundAdmin = await Employee.findOne(email);
  if (!foundAdmin) {
    let newEmp = new Employee({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      department: body.department,
      salary: body.salary,
      date: body.date,
      note: body.note
    });

    const data = await Employee.create(newEmp);

    response.status = 200;
    response.success = true;
    response.message = 'Employee Added';
    response.data = data;
    return response;
  } else {
    response.status = 200;
    response.success = false;
    response.message = 'Employee Already Exists';
    response.data = body;
    return response;
  }
};

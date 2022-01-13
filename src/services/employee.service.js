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

//get all Employees
export const getAllEmployees = async () => {
  const data = await Employee.find();

  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  response.status = 200;
  response.success = true;
  response.message = 'Employees Fetched';
  response.data = data;
  return response;
};

//get single Employee
export const getEmployee = async (id) => {
  const data = await Employee.findById(id);
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  response.status = 200;
  response.success = true;
  response.message = 'Employee Fetched';
  response.data = data;
  return response;
};

//update single Employee
export const updateEmployee = async (id, body) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };
  let email = { email: body.email };
  let foundAdmin = await Employee.findOne(email);
  if (!foundAdmin) {
    let newEmp = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      department: body.department,
      salary: body.salary,
      date: body.date,
      note: body.note
    };
    const data = await Employee.findByIdAndUpdate({ _id: id }, newEmp, {
      new: true
    });

    response.status = 200;
    response.success = true;
    response.message = 'Employee Updated';
    response.data = data;
    return response;
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Employee Not Found';
    response.data = body;
    return response;
  }
};

import { Schema, model } from 'mongoose';


const  employeeSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email : {
      type: String
    },
    gender: {
      type: String
    },
    department: {
      type: String
    },
    salary: {
      type: Number
    },
    date: {
      type: String
    },
    note: {
      type: String
    },
  },
  {
    timestamps: true
  }
);

export default model('Employees', employeeSchema);

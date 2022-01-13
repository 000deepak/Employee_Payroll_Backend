
/**
 * @purpose      To create reference for moongoose,develop schema and create model instance.
 * @module       model
 * @file         admin.model.js
 * @author       deepak 
 * @since        9/1/2022
 */
import { Schema, model }  from 'mongoose';


const  adminSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
   email: {
      type: String
    },
    password: {
      type: String
    },
  },
  {
    timestamps: true
  }
);

export default model('admins', adminSchema);

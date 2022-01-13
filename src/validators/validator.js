import Joi from 'joi';

export const adminValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(20).required(), //.pattern(new RegExp("([A-Z][a-z]*)([\\s\\'-][A-Z][a-z]*)*")),

    lastName: Joi.string().min(2).max(20).required(), //.pattern(new RegExp("([A-Z][a-z]*)([\\s\\'-][A-Z][a-z]*)*")),

    email: Joi.string(), //.pattern(new RegExp("^^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")).required(),

    password: Joi.string() //.pattern(new RegExp("^^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string(),

    password: Joi.string()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const passwordValidator = (req, res, next) => {
  const schema = Joi.object({
    confirmPassword: Joi.string()
  });
  const { error, value } = schema.validate({
    confirmPassword: req.body.confirmPassword
  });
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const emailValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const empValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(20).required(), //.pattern(new RegExp("([A-Z][a-z]*)([\\s\\'-][A-Z][a-z]*)*")),

    lastName: Joi.string().min(2).max(20).required(), //.pattern(new RegExp("([A-Z][a-z]*)([\\s\\'-][A-Z][a-z]*)*")),

    email: Joi.string().email().required(),

    department: Joi.string().required(),

    gender: Joi.string().allow(null, ''),

    salary: Joi.number().allow(null, ''),

    joinDate: joi.date().raw().required(),

    note: Joi.string().allow(null, '')
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

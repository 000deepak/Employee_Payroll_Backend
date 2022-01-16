import Joi from 'joi';

export const adminValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(2).max(20).required(),

    lastName: Joi.string().alphanum().min(2).max(20).required(),

    email: Joi.string().email().required(),

    password: Joi.string().alphanum().min(6).max(20).required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
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
    firstName: Joi.string()
      .min(3)
      .max(20)
      .required()
      .pattern(new RegExp('^[a-zA-Zs]+$')),

    lastName: Joi.string()
      .min(2)
      .max(20)
      .required()
      .pattern(new RegExp('^[a-zA-Zs]+$')),

    email: Joi.string().email().required(),

    gender: Joi.string().allow(null, ''),

    department: Joi.string().alphanum().required(),

    salary: Joi.number().allow(null, ''),

    date: Joi.string().required(),

    note: Joi.string().allow(null, ''),

    data: Joi.allow()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

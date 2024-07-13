import Joi from 'joi';

const taskSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  completed: Joi.boolean()
});

const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow('', null),
  completed: Joi.boolean()
}).min(1);

export const createTaskValidator = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const updateTaskValidator = (req, res, next) => {
  const { error } = updateTaskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
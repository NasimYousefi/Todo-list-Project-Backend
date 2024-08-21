import Joi from 'joi';

const taskSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  due_date: Joi.date().required(),
  completed: Joi.boolean().optional(),
}).unknown(true);

const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow('', null),
  completed: Joi.boolean(),
  // due_date: Joi.date().allow(null),
  due_date: Joi.date().iso().allow(null),
  user_id: Joi.number().integer()
}).min(1).unknown(true);

export const createTaskValidator = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  console.log('Validating task data:', req.body);
  if (error) {
    console.error('Validation error:', error.details); 
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const updateTaskValidator = (req, res, next) => {
  console.log('Received data for update:', req.body);
  if (req.body.due_date) {
    req.body.due_date = new Date(req.body.due_date);
  }
  const { error } = updateTaskSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
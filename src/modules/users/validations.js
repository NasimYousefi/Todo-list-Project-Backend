import Joi from 'joi';


const getUserByIdValidator = async (req, res, next) => {
    try {
      const paramsSchema = Joi.object({
        id: Joi.number().required()
      }).required();
      
      const validatedParams = await paramsSchema.validateAsync(req.params);
      req.validatedParams = validatedParams;
      next();
    } catch (error) {
      res.status(400).json({message: error.message});
    }
  }


const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required()
});

// const updateUserSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string().email()
// }).min(1);

const createUserValidator = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};


  const updateUserValidator = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(1).max(100),
      email: Joi.string().email()
    }).min(1);
  
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

export {
  getUserByIdValidator,
  createUserValidator,
  updateUserValidator
};
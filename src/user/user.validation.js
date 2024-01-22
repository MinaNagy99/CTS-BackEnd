import joi from "joi";

const userSchemaLogin = joi.object({
  email: joi
    .string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)
    .required(),
  password: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/

)
    .required(),
});
const userSchemaCreate = joi.object({
  name: joi.string().min(2).max(15).required(),
  email: joi
    .string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)
    .required(),
  password: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/

)
    .required(),
  avatar: joi.any(),
});

const userSchemaUpdate = joi.object({
  name: joi.string().min(2).max(15),
  email: joi.string().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/),
  avatar: joi.object(),
  password: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/

)
    
});

export { userSchemaCreate, userSchemaUpdate, userSchemaLogin };

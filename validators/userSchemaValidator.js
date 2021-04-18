const Joi = require('joi'); 
 const userSchemaValidator=Joi.object({
    name: Joi.string()
    .min(3)
    .max(30)
    .required(),

    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    mobile: Joi.string()
    .min(3)
    .max(30)
    .required(),

    address: Joi.string()
    .min(3)
    .max(30)
 })

 module.exports =userSchemaValidator;
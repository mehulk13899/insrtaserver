const Joi = require('joi'); 
const userSchemaValidator=require('../validators/userSchemaValidator');

const userValidatorMiddleware= async (req,res)=>{
    try {
        const {value,error}= await userSchemaValidator.validateAsync(req.body)
        if(!error) {next()}
    }
    catch(error)
    {
        return res.send(error.details);
    }
}
 module.exports =userValidatorMiddleware;
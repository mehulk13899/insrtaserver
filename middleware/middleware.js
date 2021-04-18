const {key1}=require('../privatekey');
var jwt = require('jsonwebtoken');
const User=require('../models/user')



const userTokenValidator=  (req,res,next)=>{

    var {authorization} = req.headers;
    if(!authorization)
    {
        return res.status(400).send('Provide Sign in Token');
    }
    else
    {
        let token=authorization.replace("Bearer ","");
        jwt.verify(token, key1, function(err, decoded) {
            if(err) {
                return res.status(400).send("Unauthorize Access");
            }
            else{
                req.id=decoded._id;
            }
          });
    }
    next();
}

module.exports =userTokenValidator;
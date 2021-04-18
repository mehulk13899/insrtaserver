const mongoose=require('mongoose');
const Joi = require('joi'); 

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        length:{
            min:3,
            max:255
        },
        unique:true
    },
    email: {
        type: String,
        required: true,
        length:{
            min:3,
            max:255
        },
        unique:true
    },
    password: {
        type: String,
        required: true,
        length:{
            min:3,
            max:255
        }
    }
})

module.exports =mongoose.model('User',userSchema);

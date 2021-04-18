const express =require('express');
const router=express.Router();
const bcrypt = require('bcrypt');
const User=require('../models/user')
const Joi = require('joi'); 
const userValidatorMiddleware=require('../middleware/validator')
var jwt = require('jsonwebtoken');
const {key1}=require('../privatekey');
const axios = require('axios');

router.post('/getAllUser',async(req,res)=>{

      let user= await User.find();
    if(user)
        return res.status(200).send(user);
    else
        return res.status(400).send('User Not Found');
})

router.post('/getUserByName',async(req,res)=>{

    const {username}=req.body;
    if(!username)
    {
        return res.status(400).send('Provide username');
    }
    console.log(username);
    let user= await User.findOne({'username':username});
  if(user)
      return res.status(200).send(user);
  else
      return res.status(400).send('User Not Found');
})

router.post('/addUser',async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password)
    {
        return res.status(400).send('Provide username,email,password');
    }
    
      bcrypt.hash(password,12)
    .then(hasPassword=>{
        user=new User({
            username,
            email,
            password:hasPassword
       })
        user.save((err,user)=>{
            if(user){
                return res.send(user);
            }else
            {
                if(err.code===11000)
                {
                    if(err.keyValue.email) return res.send('Email Already in Use');
                    else return res.status(201).send('Username Already in Use');
                }else{
                    return res.status(500).send(err);
                }
            }
        })
    })
})

router.get('/deleteUser',async (req,res)=>{

    const {username}=req.body;
    if(!username)
    {
        return res.send('username is required');
    }
    const user=await User.findOneAndDelete({'username':username});
    if(!user){
        return res.status(400).send('User Not Found')
    }
    else{
        res.send('User Deleted')
    }

})

router.post('/signin',async (req,res)=>{

    const {email,password,username}=req.body;

    if(!email&&!username)
    {
        return res.send('email or username is required');
    }
    if(!password)
    {
        return res.send('password is required');
    }
    let user=null;

    if(username)
         user=await User.findOne({'username':username});
    else
        user=await User.findOne({'email':email});

    if(!user){
        return res.status(201).send('User Not Found')
    }
    else{
        const match = await bcrypt.compare(password, user.password);
        if(match) {
            var token = jwt.sign({ _id:user._id}, key1);
            return res.status(200).json({"token":token});
        }else{
            return res.status(201).send('Password Invalid');
        }
    }
})

module.exports =router;
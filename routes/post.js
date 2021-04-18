const express =require('express');
const app =express();
const router=express.Router();
const bcrypt = require('bcrypt');
const userV = require('../middleware/middleware')
const User=require('../models/user')
const multer=require('multer');
const path=require('path');
const userTokenValidator=require('../middleware/middleware');
const Post=require('../models/post');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname.replace(/\s+/g, "-"));
    },
  });
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const upload = multer({storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter});


router.get('/addPost',userTokenValidator,upload.single('photo'),async (req,res)=>{

    const {title,body,photo}=req.body;
    let user=await User.findById(req.id)
    if(!title||!body)
    {
        return res.status(400).send('Provide body,title ');
    }
    const post=new Post({
      title:req.body.title,
      body:req.body.body,
      postedBy:user
    })
    await post.save((post,err)=>{
      if(post){
        return res.send(post);
      }
      else
      {
        return res.send(err);
      }
    })
    
})


router.get('/allPost',userTokenValidator,async (req,res)=>{

  await Post.find()
  .populate('postedBy',"_id name")
  .then(post=>{
    return res.send(post);
  })
  .catch(err=>{
    return res.send(err);
  })
  
})

router.get('/myPost',userTokenValidator,async (req,res)=>{

  console.log(req.id);
  await Post.findById({postedBy:req.id})
  .populate('postedBy',"_id name")
  .then(post=>{
    return res.send(post);
  })
  .catch(err=>{
    return res.send(err);
  })
  
})

module.exports =router;


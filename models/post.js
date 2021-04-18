const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        length:{
            min:3,
            max:255
        }
        },
    body: {
        type: String,
        required: true,
        length:{
            min:3,
            max:255
        }
    },
    photo: {
        type: String,
        default:'no photo'
    },
    postedBy:{
        type:mongoose.Schema.Types,
        ref:'User'
    }
})

module.exports =mongoose.model('Post',postSchema);

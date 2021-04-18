const express =require('express');
const mongoose=require('mongoose');
const userRoute=require('./routes/user');
const postRoute=require('./routes/post');
const cors=require('cors')

//connected to mongoose
const uri = "mongodb+srv://admin:admin@cluster0.n23bk.mongodb.net/instagram?retryWrites=true&w=majority";
mongoose.Promise=global.Promise;
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
.then(()=>{
    console.log('DataBase Connected');
})
.catch((err)=>{
    console.log(err);
})


// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri,
//  { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const app=express();
app.use(cors())
app.use(express.json());
app.use('/user/',userRoute)
app.use('/post/',postRoute)



app.listen(5000,()=>{
    console.log('Server running on 5000')
})
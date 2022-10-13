const express = require('express')
const app = express()
app.use(express.json())

const mongoose =require('mongoose');
const user = require('./models/User');
const dotenv=require('dotenv').config({ path:'./config/.env' });
mongoose.connect(process.env.DB_URI).then(()=>{console.log("connected to db")}).catch(()=>{console.log("error")})
app.post("/addUser",(req,res)=>{
    let addUser = new user(req.body)
    addUser.save((err,data)=>{
        if(err) throw err
        else res.send(data)
    })
})
app.get("/getUsers",(req,res)=>{
    user.find(
        (err,data)=>{
        if (err) throw err
        else res.json(data)
    })
})
app.get("/getUser/:id",(req,res)=>{
    user.find({_id:req.params.id},
        (err,data)=>{
            if (err) throw  err
            else res.json(data)
        })
})
app.put("/update/:id",(req,res)=>{
    user.findByIdAndUpdate({_id:req.params.id},{...req.body},(err,data)=>{
        if (err) throw err
        else res.json(data)
    })
})

app.delete("/delete/:id",(req,res)=>{
    user.findByIdAndDelete({_id:req.params.id},(err,data)=>{
        if(err) throw err 
        else res.json(data)
    })
})

app.listen(process.env.PORT,(err)=>{
    if(err) throw err
    else console.log('the server is working')
})

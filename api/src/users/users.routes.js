const userModel =require('./users.model')
const express =require('express')
const userRoute=express.Router()


userRoute.post('/api/user',async(req,res)=>{
    try{
        const user=new userModel(req.body)
        await user.save()
        res.status(201).send({user})

    }catch(e){
        res.status(401).send({"message":"error",'error':e})
    }
})

userRoute.post('/api/user/login',async(req,res)=>{
    try{
        const user=await userModel.find({email:req.body.email})
        res.status(202).send({user})
    }catch(e){
        res.status(402).send({"message":"error",'error':e})
    }
})

userRoute.get('api/user',async(req,res)=>{
    try{

    }catch(e){
        res.status().send({"message":"error",'error':e})
    }
})

userRoute.patch('api/user',async(req,res)=>{
    try{

    }catch(e){
        res.status().send({"message":"error",'error':e})
    }
})

module.exports =userRoute
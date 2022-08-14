const userModel =require('./users.model')
const express =require('express')
const userRoute=express.Router()


userRoute.post('/api/user/register',async(req,res)=>{
    try{
        const user=new userModel(req.body)
        await user.save()
        // const token= await user.generateAuthToken()
        res.status(201).send({user,token})

    }catch(e){
        res.status(401).send({"message":"error",'error':e})
    }
})

userRoute.post('/api/user/login',async(req,res)=>{
    try{
        const user=await userModel.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.status(202).send({user,token})
    }catch(error){
        res.status(402).send({"message":"error",'error':error})
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
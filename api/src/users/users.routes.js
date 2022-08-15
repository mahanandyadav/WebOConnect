const userModel =require('./users.model')
const express =require('express')
const auth =require('../middelware/auth')
const userRoute=express.Router()


userRoute.post('/api/user/register',async(req,res)=>{
    try{
        const user=new userModel(req.body)
        // console.log(user)
        await user.save()
        // const token= await user.generateAuthToken()
        res.status(201).send({user})

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

userRoute.get('/api/user/details',auth,async(req,res)=>{
    try{
        // console.log(req.user)
        res.send(req.user)

    }catch(e){
        res.status(501).send({"message":"error",'error':e})
    }
})

userRoute.patch('/api/user/update',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','phone','status','gender']
    const isUpdateAllowed=updates.every(update=>allowedUpdates.includes(update))
    
    if(!isUpdateAllowed){
        res.status(408).send({error:'invalid update'})
    }
    
    try{
        updates.forEach(update=>{
            if(req.user[update]===req.body[update]) return
            return req.user[update]=req.body[update]
        })
        await req.user.save()
        res.send(req.user)

    }catch(e){
        res.status(501).send({"message":"error in update",'error':e})
    }
})

userRoute.patch('/api/user/update_password',auth,async(req,res)=>{

    try{
        const user=await userModel.findByCredentials(req.body.email,req.body.password)
        user.password=req.body.new_password
        await user.save()
        res.status(200).send({'message':"password update done",user})

    }catch(e){
        res.status(501).send({"message":"error in  password update",'error':e})
    }
})

userRoute.delete('/api/user/delete',auth,async(req,res)=>{

    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

userRoute.post('/api/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({ body: " logout done" })
    } catch (e) {
        res.status(500).send()
    }
})
module.exports =userRoute
const jwt =require('jsonwebtoken')
const UserModel =require('../users/users.model')

const auth =async(  req,res,next)=>{
    try{
        console.log(req.header)
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.KEY_WORDS)
        const user=await UserModel.findOne({_id:decoded._id,'tokens.token':token})

        if(!user){
            throw new Error('user not defined')
        }
        req.user=user
        req.token=token
        next()
    }catch(e){
        res.status(401).send({ error: e,'message':'user auth error' })
    }
}

module.exports=auth
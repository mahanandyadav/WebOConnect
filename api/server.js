const express=require('express')
const app=new express()
const userRoute=require('./src/users/users.routes')
require('dotenv').config()
require('./src/db/db')

app.use(express.json())
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','*')
    res.header('Access-Control-Allow-Credentials','true')
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE')
     return   res.status(200).json()
    }
    next()

})

app.use(userRoute)

const port=process.env.PORT || 3001
app.listen(port,(error)=>{
    if(error) console.log('listening error: '+error)
    console.log(`listening on port ${port}`)
})
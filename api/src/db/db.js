const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGO_DB_CONNECTION_STRING,
    (error) => {
        if (error) {
            console.log('db connection error--> ', error)
        } else {
            console.log('db connected!!')
        }
    })
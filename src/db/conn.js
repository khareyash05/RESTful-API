const mongoose = require("mongoose")

const DB = "mongodb+srv://yash:05112001@cluster0.73ns4.mongodb.net/students-api?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false
}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{console.log(err);})
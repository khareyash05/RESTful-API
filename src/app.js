const express = require("express")
const app = express()
const Student = require("./model/student")

const port = process.env.PORT || 3000 ;
app.use(express.json())

require("./db/conn")

app.post("/students",async (req,res) =>{
    try{
        const User = new Student(req.body)
        await User.save()
        console.log("Added sucessfully");
        res.status(200).send("Added sucessfully")
    }catch{
        console.log("Error at saving");
    }
})

app.get("/students",async (req,res)=>{
    try{
        const studentData = await Student.find()
        res.send(studentData)
    }catch{
        console.log("Error in sending");
    }
})

app.get("/students/:id",async (req,res)=>{
    try{
        const _id = req.params.id
        const studentsData = await Student.findById(_id)
        if(!studentsData){
            res.status(404).send()
        }
        else {
            res.send(studentsData)
        }
    }catch{
        res.status(500).send("Error")
        console.log("error");
    }
})
// Update students by id
app.patch("/students/:id",async (req,res)=>{
    try{
        const _id = req.params.id
        const updateStudent  = await Student.findByIdAndUpdate(_id,req.body , {
            new : true
        })
        res.status(200).send(updateStudent)
    }catch{
        console.log("Error");
        res.status(404).send("Error")
    }
})

app.delete("/students/:id" ,async(req,res)=>{
    try{
        const _id = req.params.id
        const deleteStudent = await Student.findByIdAndDelete(_id)
        if(!deleteStudent){
            res.status(404).send("Eroor in deleting")
        }
        else {
            res.status(200).send(deleteStudent)
        }
    }catch{
        res.status(500).send("Error")
    }
})

app.listen(port , ()=>{
    console.log(`Connection setup at ${port} `);
})
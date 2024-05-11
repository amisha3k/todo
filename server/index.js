const express =require('express')
const mongoose =require('mongoose')
const cors=require('cors')
const TodoModel=require('./models/todo')

const app=express()

const corsOption = { origin: "http://localhost:3001", origin: true}
app.use(cors(corsOption))
app.use(express.json())

const PORT= 3001 | process.env

mongoose.connect("mongodb+srv://khichariyaamisha:Amisha%4003@cluster3.v6u3yne.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/test', (req, res)=>{
    res.send("Hello");
})

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    TodoModel.findByIdAndUpdate({_id: id},{done: true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params.id;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.post('/add/:id',(req,res)=>{
    const task=req.body.task;
    TodoModel.create({
        task: task
    }).then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.listen(PORT,()=>{
    console.log("congratulation server is running! on port", PORT)
})

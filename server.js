import express from 'express'  
import mongoose from 'mongoose'
import cors from 'cors'
const app=express();
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/Todo')
.then(()=> console.log('Mongodb connected'))
.catch(()=>console.log('Error'))
const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:String,
    completed:String,
    available:{
        type:Boolean,
        default:false
    }
})
const TodoModel=mongoose.model('Todos',todoSchema)

// API for todo
app.post('/todo',async (req,res)=>{

    if(!req.body){
        res.status(400).send('Give the proper details')
    }


    const data=new TodoModel(req.body);
    await data.save();
    res.status(201).send('Todo added successfully...')
})

app.get('/todo',async(req,res)=>{
    let data=await TodoModel.find();
    res.json(data)
})

app.put('/todo/:id',async(req,res)=>{
    const id=req.params.id;
    const data=req.body;
    await TodoModel.findByIdAndUpdate(
        id,
        data,
        {new:true}
    )
    res.send('Todo Updated')
})

app.delete('/todo/:id', async (req, res) => {
    const id = req.params.id;  
    await TodoModel.findByIdAndDelete(id);
    res.send("Todo deleted...")
})


app.listen(3333,()=>{
    console.log('server started at portnumber 3333')
})


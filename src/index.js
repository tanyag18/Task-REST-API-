const express=require('express')
require('./db/mongoose')
const User=require('./models/users')
const Task=require('./models/tasks')

const app=express()
const port =process.env.PORT || 3000

//app.get - to access given route with http request
//app.post- for resource creation
app.use(express.json())  // to grab incoming json bosy data

app.post('/users',async (req,res)=>{            //using async and await
    const user=new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }

    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

app.post('/tasks', async (req,res)=>{
    const task=new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e){
         res.status(400).send(e)
    }
})

app.get('/users', async (req,res)=>{

    try{
        const users=await User.find({})
            res.send(users)
    }
    catch(e){
        res.status(500).send()
    }
})

app.get('/users/:id', async (req,res)=>{      // dynamic value :id
    //console.log(req.params)
    const _id=req.params.id
    User.findById(_id).then((user)=>{
        if(!user)
        {
           return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
})


app.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch(()=>{
        res.status(500).send()
    })
})

app.get('/tasks/:id',(req,res)=>{      // dynamic value :id
    //console.log(req.params)
    const _id=req.params.id
    Task.findById(_id).then((task)=>{
        if(!task)
        {
           return res.status(404).send()
        }
        res.send(task)
    }).catch((e)=>{
        res.status(500).send()
    })
})

//update user 
app.patch('/users/:id', async (req,res)=>{ 
    const updates= Object.keys(req.body)
    const allowedUpdate =['name','email','password','age']
    const isValid = updates.every((update) => allowedUpdate.includes(update))

    if(!isValid){
        return res.status(400).send({error : 'Invalid Updates'})
    }

    try{
        const user= await User.findByIdAndUpdate(req.params.id, req.body , {new : true , runValidators: true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

//update task
app.patch('/tasks/:id', async (req,res)=>{

    const updates= Object.keys(req.body)
    const allowedUpdate =['description','completed']
    const isValid = updates.every((update) => allowedUpdate.includes(update))
    if(!isValid){
        return res.status(400).send({error : 'Invalid Updates'})
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body , {new : true , runValidators: true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})


//delete user
app.delete('/users/:id', async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

//delete task
app.delete('/tasks/:id', async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})



app.listen(port , ()=>{
    console.log('Server is listening on port: '+port)
})
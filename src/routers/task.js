const express=require('express')
const User=require('./models/tasks')
const router = new express.Router()

router.post('/tasks', async (req,res)=>{
    const task=new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e){
         res.status(400).send(e)
    }
})


router.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch(()=>{
        res.status(500).send()
    })
})

router.get('/tasks/:id',(req,res)=>{      // dynamic value :id
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



//update task
router.patch('/tasks/:id', async (req,res)=>{

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




//delete task
router.delete('/tasks/:id', async (req,res)=>{
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

module.exports = routers
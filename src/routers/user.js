const express=require('express')
const User=require('./models/users')
const router = new express.Router()


//create user
router.post('/users',async (req,res)=>{            //using async and await
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


//read users
router.get('/users', async (req,res)=>{

    try{
        const users=await User.find({})
            res.send(users)
    }
    catch(e){
        res.status(500).send()
    }
})


//find one user
router.get('/users/:id', async (req,res)=>{      // dynamic value :id
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

//update user 
router.patch('/users/:id', async (req,res)=>{ 
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

//delete user
router.delete('/users/:id', async (req,res)=>{
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


module.exports = routers

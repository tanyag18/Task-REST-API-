require('../src/db/mongoose')
const User= require('../src/models/users')

//5eda3415ca10c82c48d80fa7
//fetch users with same age as of this id

// User.findByIdAndUpdate('5eda3415ca10c82c48d80fa7',{age:1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })


const userage = async (id,age) =>{
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}

userage('5eda3415ca10c82c48d80fa7',1).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
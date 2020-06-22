const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api' ,{
    useNewUrlParser: true,
    useCreateIndex :true,
    useUnifiedTopology: true,
    useFindAndModify:false
})





// const task = new Task({
//     description : 'Learn mongoose library',
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log('Error :'+ error)
// })
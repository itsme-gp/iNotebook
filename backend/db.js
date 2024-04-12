const mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017/iNotebook"

async function connectToMomgo(){
    // mongoose.conect(mongoURL, ()=>{
    //     console.log("Connected to Mongo successfully")
    // })
    await mongoose.connect(mongoURL).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
}

module.exports = connectToMomgo;
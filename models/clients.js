const mongoose = require('mongoose');
const clientsSchema = new mongoose.Schema({
     name:String,
     email:String,
     phone:String,
     message:String,
})
const clientsModel = mongoose.model("clients",clientsSchema)
module.exports = clientsModel

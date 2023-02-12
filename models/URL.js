const mongoose = require('mongoose')
const Schema = mongoose.Schema
const URLSchema = new Schema({
    original: {
        type: String,
        required: true
    },
    shortener:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('URL', URLSchema)
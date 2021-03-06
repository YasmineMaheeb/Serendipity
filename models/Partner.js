//The Partner Model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PartnerSchema = new Schema({
    _id: {type: Schema.ObjectId, auto: true},
    email: {type: String, required: true},
    name: {type: String,required: true},
    password: {type: String,required: true},
    description: {type: String},
    partners: {type: String },
    boardOfMembers: {type: String },
    fieldOfWork: {type: String }, 
    vacancies: [{type: Schema.Types.ObjectId, ref: 'jobs'}],
    pastProjects: {type: String},
    registered: {
        type: String, 
        default:'no',
        required: false
    }
})
module.exports = Partner = mongoose.model('partners', PartnerSchema)

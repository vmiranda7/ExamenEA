var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
        name: {type: String},
        director: {type: String},
        language:{type:String},
        type:{type:String, enum:['Terror','Accion','Biografica','Animada','Amor']},
        description:{type:String}
    },
    {versionKey: false});
module.exports = mongoose.model('Film', schema);
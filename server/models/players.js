var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = new Schema({
    name: String,
    captain: Boolean,
    owner:Boolean,
    speciality:String,
    basePrice: Number,
    category:String,
    sold: Boolean,
    team: String,
    soldAmount:Number,
    gender:String,
    sortOrder:Number

},{
    timestamps: true
  });


module.exports = mongoose.model('Player', Player);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = new Schema({
    name: String,
    basePrice: Number,
    batting: Boolean,
    bowling: Boolean,
    wicketKeeping: Boolean,
    captain: Boolean,
    marquee: Boolean,
    sold: Boolean,
    team: String
});


module.exports = mongoose.model('Player', Player);
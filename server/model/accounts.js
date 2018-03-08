var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    id: {
        type: number
    },
    teamname: {
        type: String
    }, 
    accounttype:{
        type: String
    },
    username: {
        type: String,
        required: true
    },
    email:{
        type: String
    },
    password: String
},{
  timestamps: true
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
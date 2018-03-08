var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: {
        type: String,
        required: true
    }, 
    accounttype:{
        type: String
    },
    password: String
},{
  timestamps: true
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
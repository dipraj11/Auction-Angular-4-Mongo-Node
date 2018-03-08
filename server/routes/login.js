/**
 * Created by User on 6/5/2017.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

router.post('/login', passport.authenticate('local'), function (req, res) {
    console.log('logging in');
    let response = {}
    response.teamName = req.user.username
    response.type = req.user.accounttype
    response.loggedIn = true
    res.send(response)
})

router.get('/login-check', (req, res) => {
    console.log('Checking Login Status')
    let response = {}
    if (req.user) {
        console.log(`User ${req.user.username} is logged in!!`)
        response.teamName = req.user.username
        response.type = req.user.accounttype
        response.loggedIn = true
    }
    else {
        console.log('User not logged in!!')
        response.username = ''
        response.userid = ''
        response.useremail = ''
        response.loggedIn = false
    }
    res.send(response)
})

router.get('/logout', (req, res) => {
    console.log('Logging Out!')
    try {
        req.logout()
        // req.session.destroy()
        let response = {}
        response.message = 'Logged Out!'
        res.send(response)
    }
    catch (err) {
        console.log(`Error in Logging out ${req.user.username} : ${err}`)
        throw err
    }

})

module.exports = router;

//code for server side
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var expressValidator = require('express-validator');
const expressSession = require('express-session');
const MongoStore  = require('connect-mongo')(expressSession);
const cors = require('cors')
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');



// // Get our API routes
// const home = require('./server/routes/home-stats');


const app = express();
app.use(cors())
// view engine setup
// app.set('views', path.join(__dirname, './server/views'));
// app.set('view engine', 'jade');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());
app.use(cookieParser());

//Login Logic
mongoose.connect('mongodb://35.193.228.112:8080/login')
const db = mongoose.connection

app.use(expressSession({
  secret:'max',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({
      mongooseConnection: db
    })
}))
app.use(passport.initialize());
app.use(passport.session());


// const Account = require('./server/models/account')
// passport.use(new LocalStrategy(Account.authenticate()))

// // used to serialize the user
// passport.serializeUser(function(user, done) {
//   user = user.toObject()
//   if(user.userid < 10){
//      user.userid =  '0' + user.userid.toString()
//   }else{
//       user.userid = user.userid.toString()
//   }
//   done(null, user);
// });

// // used to deserialize the user
// passport.deserializeUser(function(id, done) {
//   Account.findById(id, function(err, user) {
//       user =  user.toObject()
//       if(user.userid < 10){
//           user.userid = '0' + user.userid.toString()
//       }else{
//          user.userid = user.userid.toString()
//       }
//       done(err, user);
//   });
// });

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Read the link below about express behind a proxy
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

// Set our api routes
// app.use('/home-stats', home);



// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
 const port = process.env.PORT || 4000;

app.set('port', port);

/**
 * Create HTTP server.
 */


const server = http.createServer(app);


server.setTimeout(120*60*1000)

/**
 * Listen on provided port, on all network interfaces.
 */

// https.createServer(ssl, app).listen(process.env.PORT || 8443);
server.listen(port, () => console.log(`API running on localhost:${port}`));
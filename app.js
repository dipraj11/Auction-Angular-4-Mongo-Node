// import { body } from 'express-validator/check';

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var expressValidator = require('express-validator');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const cors = require('cors')
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

let buzzerFlag = true

teams = [
  {
    teamname: 'demo',
    balance: 2000,
    noOfPlayers: 0,
    color: 'red'
  },
  {
    teamname: 'demo1',
    balance: 2000,
    noOfPlayers: 0,
    color: 'yellow'
  },
  {
    teamname: 'demo2',
    balance: 2000,
    noOfPlayers: 0,
    color: 'green'
  },
  {
    teamname: 'demo3',
    balance: 2000,
    noOfPlayers: 0,
    color: 'blue'
  },
  {
    teamname: 'demo4',
    balance: 2000,
    noOfPlayers: 0,
    color: 'indigo'
  },
  {
    teamname: 'demo5',
    balance: 2000,
    noOfPlayers: 0,
    color: 'purple'
  },
  {
    teamname: 'demo6',
    balance: 2000,
    noOfPlayers: 0,
    color: 'brown'
  },
  {
    teamname: 'demo7',
    balance: 2000,
    noOfPlayers: 0,
    color: 'orange'
  },
  {
    teamname: 'demo8',
    balance: 2000,
    noOfPlayers: 0,
    color: 'pink'
  },
  {
    teamname: 'demo9',
    balance: 2000,
    noOfPlayers: 0,
    color: 'lilac'
  },
  {
    teamname: 'demo10',
    balance: 2000,
    noOfPlayers: 0,
    color: 'violet'
  },
  {
    teamname: 'demo11',
    balance: 2000,
    noOfPlayers: 0,
    color: 'teal'
  },
]

// // Get our API routes
const login = require('./server/routes/login');


const app = express();
app.use(cors())
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
// app.set('views', path.join(__dirname, './server/views'));
// app.set('view engine', 'jade');



app.use(expressValidator());
app.use(cookieParser());

//Login Logic
mongoose.connect('mongodb://35.192.54.134:4300/qcb-data')
const db = mongoose.connection

app.use(expressSession({
  secret: 'max',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({
    mongooseConnection: db
  })
}))
app.use(passport.initialize());
app.use(passport.session());


const Account = require('./server/models/account')
passport.use(new LocalStrategy(Account.authenticate()))

// used to serialize the user
passport.serializeUser(function (user, done) {
  // user = user.toObject()

  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  Account.findById(id, function (err, user) {
    // user = user.toObject()

    done(err, user);
  });
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Read the link below about express behind a proxy
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

// Set our api routes
app.use('/login', login);

app.post('/register', function (req, res) {
  console.log(req.body)
  let type = ''
  if (req.body.teamName == 'admin') {
    type = 'admin'
  } else {
    type = 'team';
  }
  Account.register(new Account({ username: req.body.teamName, accounttype: type, ownerName: req.body.ownerName, captainName: req.body.captainName, teamName: req.body.teamName }), req.body.password, function (err, account) {
    if (err) {
      console.log(err)

      return res.send('ho gaya');
    }
  });

});


const Player = require('./server/models/players')

// Player.find({}, function(err,data) {
//   console.log(data);

// })


//for initial team data
app.get('/get-all-players', (req, res, next) => {
  playersData = [];
  Player.find({}, { _id: false, sortOrder: false, captain: false, owner: false }, function (err, playersDetails) {
    if (err) {
      console.log(err)
      res.send([]);
    }
    //console.log(playersDetails);
    playersData = playersDetails
    res.json(playersData);
  })
})

app.get('/get-all-players-r',(req, res, next) => {
  playersData = [];
  Player.find({ sold:false}, { _id: false, sortOrder: false, captain: false, owner: false }, function (err, playersDetails) {
    if (err) {
      console.log(err)
      res.send([]);
    }
    //console.log(playersDetails);
    playersData = playersDetails
    res.json(playersData);
  })
})



//for initial team data
app.get('/get-team-details', (req, res, next) => {
  console.log('Req',req.user.teamName)
  playersData = [];
  response = {};
  sum = 0;
  Player.find({team:req.user.teamName},{_id:false,name:true,soldAmount:true,speciality:true,gender:true}, function(err,playersDetails) {
    if(err){
      console.log(err)
      res.send([]);
    }
    console.log(playersDetails);
    playersData = playersDetails
    playersDetails.forEach((data)=>{
      sum += data.soldAmount;
    })
    response.plyerDetails = playersData;
    response.balance = 2000 - sum
    res.json(response);
  })
})



app.get('/get-player-name', (req, res, next) => {
  arrNames = [];
  Player.find({}, { name: true, _id: false }, function (err, playersDetails) {
    if (err) {
      console.log(err)
      res.send([]);
    }
    //console.log(playersDetails);
    playersDetails.forEach(element => {
      arrNames.push(element.name)
    });
    res.json(arrNames);
  })
})




app.post('/sold-player', (req, res, next) => {
  Player.findOneAndUpdate({ name: req.body.playerName }, { $set: { sold: true, soldAmount: req.body.bidAmount, team: req.body.teamName } }, function (err, playersDetails) {
    if (err) {
      console.log(err)
      res.send([]);
    }
    //console.log(playersDetails);
    Account.find({ teamName: req.body.teamName }, (err, data) => {
      data.balance = data.balance - req.body.bidAmount;
      Account.findOneAndUpdate({ teamName: req.body.teamName }, { $set: { balance: data.balance } }, (err, data) => {
        res.send({message: 'done'});
      })
    })
  })
})

app.get('/buzzer-status', (req, res, next) => {
  res.send(buzzerFlag)
})

//for initial team data
// app.get('/team-details', (req, res, next) => {
//   let jsonToSend = []
//   let balance = 0
//   let noOfPlayers = 0
//   for (let i = 0; i < player.length; i++) {
//     if (player[i].team == req.user.username) {
//       jsonToSend.push(player[i])
//     }
//   }
//   for(let i = 0 ; i<teams.length; i++){
//     if(teams[i].teamname == req.user.username){
//       balance = teams[i].balance
//       noOfPlayers = jsonToSend.length
//     }
//   }
//   res.json({balance: balance, noOfPlayers: noOfPlayers, playerData: jsonToSend});
// })


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
server.setTimeout(120 * 60 * 1000)


let i = 0

var io = require('socket.io')(server);
// socket io
io.on('connection', function (socket) {
  console.log('User connected');

  socket.on('bid', function (data) {
    console.log(`Bid Data is ${data}`);
    buzzerFlag = false
    socket.broadcast.emit('broadcast-bid', data)
  });


  socket.on('reset', function (data) {
    buzzerFlag = true
    socket.broadcast.emit('reset-all-buzzers', buzzerFlag)
  })
  socket.on('sold', function () {
    socket.broadcast.emit('refresh-all')
  })
});


function loadPlayer(index) {
  // get info from index


}

/**
 * Listen on provided port, on all network interfaces.
 */

// https.createServer(ssl, app).listen(process.env.PORT || 8443);
server.listen(port, () => console.log(`API running on localhost:${port}`));
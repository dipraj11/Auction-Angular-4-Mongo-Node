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

const mysql = require('mysql')



// const connectionMySQL = mysql.createConnection({
//   host: '35.225.36.190',
//   user: 'root',
//   password: 'Quant1ph1'
// })


// connectionMySQL.connect((err) => {
//   if (err)
//     console.log(err);
//   else {
//     console.log('Connected');
// connectionMySQL.query("SHOW TABLES", function (err, result) {
//   if (err) throw err;
//   console.log("Database created");
// });
//   }

// })
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");

// });




player = [{
    name: 'Shishir Tiwari',
    batting: true,
    bowling: true,
    fielding: false,
    basePrice: 78,
    sold: false,
    team: '',
  },
  {
    name: 'Rajesh Singh',
    batting: true,
    bowling: false,
    fielding: false,
    basePrice: 50,
    sold: false,
    team: '',
  },
  {
    name: 'Vishesh Harwani',
    batting: true,
    bowling: true,
    fielding: true,
    basePrice: 65,
    sold: false,
    team: '',
  }
]

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
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
// view engine setup
// app.set('views', path.join(__dirname, './server/views'));
// app.set('view engine', 'jade');



app.use(expressValidator());
app.use(cookieParser());

// //Login Logic
mongoose.connect('mongodb://35.192.54.134:4300/login')
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
  user = user.toObject()

  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  Account.findById(id, function (err, user) {
    user = user.toObject()

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
  let type = ''
  if (req.body.teamName == 'admin') {
    type = 'admin'
  } else {
    type = 'owner'
  }
  Account.register(new Account({ username: req.body.teamName, accounttype: type }), req.body.password, function (err, account) {
    if (err) {
      console.log(err)

      return res.send('ho gaya');
    }
  });

});

//for initial team data
app.get('/team-details', (req, res, next) => {
  let jsonToSend = []
  let balance = 0
  let noOfPlayers = 0
  for (let i = 0; i < player.length; i++) {
    if (player[i].team == req.user.username) {
      jsonToSend.push(player[i])
    }
  }

  

  for(let i = 0 ; i<teams.length; i++){
    if(teams[i].teamname == req.user.username){
      balance = teams[i].balance
      noOfPlayers = jsonToSend.length
    }
  }

  
  


  res.json({balance: balance, noOfPlayers: noOfPlayers, playerData: jsonToSend});
})


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
  socket.broadcast.emit('load-new-player', player[0])
  socket.broadcast.emit('broadcast-bid', player[0].basePrice)

  socket.on('bid', function (data) {
    console.log(`Bid Data is ${data["amount"]}`);
    console.log('complete data is :')
    console.log(data)
    socket.broadcast.emit('broadcast-bid', data)
  });

  socket.on('sold', function (data) {
    console.log(`value of i is ${i}`);
    
    //update player status
    player[i].sold = true
    
    player[i].soldPrice = data.amount
    //subtract buying team's balance
    for(let x = 0; x< teams.length; x++) {
      if(teams[x].teamname == data.teamName){
        teams[x].balance = teams[x].balance - data.amount
        teams[x].noOfPlayers++
        break;
      }
    }
    //add to buying teams roster
    player[i].team = data.teamName
    
    //log player
    console.log(player[i])
    //log team details

    //index update
    i++
    //load new player
    socket.broadcast.emit('load-new-player', player[i])
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
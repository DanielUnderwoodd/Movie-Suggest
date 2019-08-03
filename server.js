const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var flash = require('connect-flash');
var config = require('./config/database');
var passport = require('passport')


//connect to database
mongoose.connect(config.database);

var db = mongoose.connection;
// static files
app.use(express.static(path.join(__dirname , 'public')));


var movies = require('./models/movie');

// Session middleware
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
 
}))

//Express Messages Middleware

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));



db.once('open',function(){
console.log("mongodb is running");
});
db.on('error',function(err){
 
    console.log(err);
});
 mongoose.Promise = global.Promise;


//set ejs engine
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


//set body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//passport Config


require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('*',function(req,res,next){
    res.locals.user = req.user || null;
    console.log(res.locals.user);
    next();
})

// main_get middleware


app.get('/',function(req,res){

movies.find({},function(err,movie){
    if(err){
        console.log(err)
    }else if (!res.locals.user){
res.redirect("/users/login")
    } else{

res.render('index1',{
    title: 'movies',
    movies: movie
   
})

    }
})
});

app.get('/users/dash',function(req,res){



})



// Routes Files
var moviees = require('./routes/movie');
app.use('/movie',moviees);
var Users = require('./routes/users');
app.use('/users', Users);



app.listen(4000,function(){
    console.log('listing to port 3000');
});
const  LocalStrategy = require('passport-local').Strategy;
var Users = require('../models/user');
var config = require('../config/database')
const bcrypt = require('bcryptjs');
var passport = require('passport')

module.exports = function(passport){


    passport.use(new LocalStrategy(function(username,password,done){

        var query = {username: username};
        Users.findOne(query,function(err,user){

            if(err) throw err;
            if(!user){
                return done(null,false,{message: 'No user found'});
            }


bcrypt.compare(password,user.password,function(err,isMatch){
if(err) throw err;
if(isMatch){

    return done(null,user)
}
else{

    return done(null,false,{message: 'wrong password'})
}
})


        })
    }))
    passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Users.findById(id, function(err, user) {
    done(err, user);
  });
});
}
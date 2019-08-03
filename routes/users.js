



const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var passport = require('passport');



//bring the user model

var Users = require('../models/user');
var movies = require("../models/movie")

router.get('/register',function(req,res){

    if(res.locals.user){
            
        res.redirect('/');


     }else{

        res.render('register',{
        title: "login"

     })

}

})
//register post
router.post('/register',function(req,res){
    req.checkBody('full_name','Full name required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('password','Password required').notEmpty();
    req.checkBody('username','Username required').notEmpty();
    req.checkBody('password2','Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if(errors){
res.render('register',{
    title: 'Register',
    errors: errors
})

    }else {
        var newUser = new Users({
        full_name: req.body.full_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
        });

bcrypt.genSalt(10 , function(err,salt){
    bcrypt.hash(newUser.password,salt,function(err,hash){

if(err){
    console.log(err)
}

newUser.password = hash;
newUser.save(function(err){
    if(err){
        console.log(err)
        return;
    }else{
        req.flash('success','You are register And can log in')
        res.redirect("/users/register");
    }
})

 })

})


    
    }
})

// Login Form
router.get('/login',function(req,res){


 
    if(res.locals.user){

       var str = res.locals.user.username;
      
    if(  str === "Admin"){
    
res.redirect('/');


}else {
 movies.find({},function(err,movie){

    if(err){
        console.log(err)
    }else{

        res.render('usersdash',{
            title: 'movies',
            movies: movie
        })
    }
})

}}else{

res.render("register",{

    title: "login"
})



}}


)

router.post('/login',function(req,res,next){

     passport.authenticate('local', { successRedirect: '/users/login',
                                     failureRedirect: '/users/login' ,
                                    failureFlash: true })(req,res,next);
                                    


})

router.get('/logout',function(req,res){
req.logout();
req.flash('success',"You are logged out!");
res.redirect("/users/register")

})

//log in Router



module.exports = router;
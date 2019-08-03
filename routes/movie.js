const express = require('express');
const router = express.Router();




//bring the model module

var movies = require('../models/movie')



router.get("/suggest",function(req,res){

    res.render('suggest',{
title: "Suggest The Movie By Percent"

    })


})



router.post("/suggest",function(req,res){
class movie {
constructor(drama,romance,action,comedy,horror,crime){
this.drama= drama;
this.romance = romance;
this.action = action;
this.comedy = comedy;
this.horror = horror;
this.crime = crime;


}

}




        req.checkBody('drama','genre(drama) required').notEmpty();
        req.checkBody('romance','genre(romance) required').notEmpty();
        req.checkBody('action','genre(action) required').notEmpty();
        req.checkBody('comedy','genre(comedy) required').notEmpty();
        req.checkBody('horror','genre(horror) required').notEmpty();
        req.checkBody('crime','genre(crime) required').notEmpty();
        var errors = req.validationErrors();
       if(errors){
            res.render('suggest',{
                title: "Suggest",
                errors: errors
            })  }   else{



var input = new movie(req.body.drama,req.body.romance,req.body.action,req.body.comedy,req.body.horror,req.body.crime)
var i =0;
var n = 28;
var sume = [];
for ( i = 0; i < n; i++){
    sume.push({sum: 0,_id: 0})}


     n = 5;
var newsum = [];



movies.find({},function(err,movie){
var i =0;
movie.forEach(function(moviee){
var drama = input.drama - moviee.drama;
var romance = input.romance - moviee.romance;
var action = input.drama - moviee.action;
var comedy = input.comedy - moviee.comedy;
var horror = input.horror - moviee.horror;
var crime = input.crime - moviee.crime;

sume[i].sum = Math.sqrt( Math.pow(drama,2) + Math.pow(romance,2) + Math.pow(action,2) + Math.pow(comedy,2) + Math.pow(horror,2) + Math.pow(crime,2)  )

sume[i]._id = moviee._id;
i++;

})
doSomethingElse(sume);



})

function doSomethingElse(sume){
    

function compare(a,b) {
  if (a.sum < b.sum)
    return -1;
  if (a.sum> b.sum)
    return 1;
  return 0;
}



sume.sort(compare)



   

for (i=0;i<5;i++){
movies.findById(sume[i]._id,function(err,movie){
    
          doSomethingElse1(movie)
})


        }


}

      function doSomethingElse1(movie){
    

    newsum.push(movie);
    if(newsum.length === 5){
console.log(newsum)
 res.render('result',{
     title: "Result",
     newsume: newsum
        })
}
    }
      
}


           
    })






















router.get('/add',function(req,res){
    res.render('add_movie',{
    title: "Add Movie",
    
    
    })
    
    
    });
    
    // Add Customer post middleware
    // show errors
    router.post('/add',function(req,res){

        

      


        req.checkBody('title','Title  required').notEmpty();
        req.checkBody('director','Director name required').notEmpty();
        req.checkBody('about','about required').notEmpty();
        req.checkBody('drama','genre(drama) required').notEmpty();
        req.checkBody('romance','genre(romance) required').notEmpty();
        req.checkBody('action','genre(action) required').notEmpty();
        req.checkBody('comedy','genre(comedy) required').notEmpty();
        req.checkBody('horror','genre(horror) required').notEmpty();
        req.checkBody('crime','genre(crime) required').notEmpty();
        req.checkBody('link','Link  required').notEmpty();
        req.checkBody('id','id  required').notEmpty();
        req.checkBody('image','Image  required').notEmpty();
         


        var errors = req.validationErrors();
        if(errors){
            res.render('add_movie',{
                title: "Add Movie",
                errors: errors
            })
        }else{
    
            var newMovie = new movies();
    
           newMovie.title = req.body.title;
           newMovie.director = req.body.director;
           newMovie.about = req.body.about;
           newMovie.drama = req.body.drama;
           newMovie.romance = req.body.romance;
           newMovie.action = req.body.action;
           newMovie.comedy = req.body.comedy;
           newMovie.horror = req.body.horror;
           newMovie.crime = req.body.crime;
           newMovie.link = req.body.link;
           newMovie.id = req.body.id;
           newMovie.image = req.body.image;

           newMovie.save(function(err){
                if(err){
                    console.log(err);
                    return;
                }else{
                    req.flash('success','Movie added') 
                    res.redirect('/');
                }
            
            })
    
    
        }
    
    
    
    
    });
    
    //get for each movie
    router.get("/:id",function(req,res){

 if(!res.locals.user){
    
     res.redirect("/users/login")

        }else{


    movies.findById(req.params.id,function(err,movie){
        res.render('movie',{
          title: "movies features",
          movie: movie
    
        })
    })
    
    
    }})
    //get for edit customers
    router.get("/edit/:id",function(req,res){
         if(!res.locals.user){
    
      res.redirect("/users/login")

        }else{
        movies.findById(req.params.id,function(err,movie){
            res.render('edit_movie',{
              title: "movie edit",
              movie: movie
        
            })
        })
        
        
        }})
    //Update POST customer
    router.post('/edit/:id',function(req,res){
       
        req.checkBody('title','Title  required').notEmpty();
        req.checkBody('director','Director name required').notEmpty();
        req.checkBody('about','about required').notEmpty();
        req.checkBody('drama','genre(drama) required').notEmpty();
        req.checkBody('romance','genre(romance) required').notEmpty();
        req.checkBody('action','genre(action) required').notEmpty();
        req.checkBody('comedy','genre(comedy) required').notEmpty();
        req.checkBody('horror','genre(horror) required').notEmpty();
        req.checkBody('crime','genre(crime) required').notEmpty();
        req.checkBody('link','Link required').notEmpty();
        req.checkBody('id','ID required').notEmpty();
        req.checkBody('image','image required').notEmpty();
        

        var errors = req.validationErrors();
       if(errors){
            res.render('add_movie',{
                title: "Add Movie",
                errors: errors
            })  }   else{
        var updateMovie = {};
       
        updateMovie.title = req.body.title;
        updateMovie.director = req.body.director;
        updateMovie.about = req.body.about;
        updateMovie.drama = req.body.drama;
        updateMovie.romance = req.body.romance;
        updateMovie.action = req.body.action;
        updateMovie.comedy = req.body.comedy;
        updateMovie.horror = req.body.horror;
        updateMovie.crime = req.body.crime;
        updateMovie.link  = req.body.link;
        updateMovie.id  = req.body.id;
        updateMovie.image = req.body.image;
        var query= {_id: req.params.id}
        movies.update(query,updateMovie,function(err){
    if(err){
        console.log(err)
    }else{
        req.flash('success','Movie Updated')
        res.redirect("/");
    }
    
        })
        
    
    }});
    
//suggest by percent 






    







        // delete movie
        router.delete('/:id',function(req,res){
        var query = ({_id: req.params.id})
        movies.remove(query,function(err){
            if(err){
                console.log(err);
            }
            req.flash('danger','Movie Deleted')
            res.status(200)
       
        })
    
    
        })
        module.exports = router; 
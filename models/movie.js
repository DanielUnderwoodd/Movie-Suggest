const   mongoose = require('mongoose');


var Schema = mongoose.Schema;
var moviesschema = new Schema({
title: {
    type: String,
    require: true
},
director:{
    type:String,
    require: true
},
about:{
    type: String,
    required: true
},
drama:{
    type: Number,
    required: true
},
romance:{
    type:  Number,
    required: true
},
action: {
    type:  Number,
    required: true
},
comedy:{
    type: Number,
    required: true
},
horror:{
    type: Number,
    required: true
},
crime:{
    type: Number,
    required: true
},
link: {
type: String,
required: true

},
id: {
    type: Number,
    required: true
},
image: {
    type: String,
    required: true
}

});



var moviemodel = module.exports= mongoose.model('movies',moviesschema);

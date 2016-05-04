'use strict';
var MovieInfo;
var mongoose=require('mongoose');

var MovieInfoSchema = new mongoose.Schema({
	imdbID:{type:String,required:true},
	imdbURL:{type:String,required:true},
	title:{type:String,required:true},
	imageURL:{type:String},
	yearReleased:{type:Number},
	starring:{type:String}
});

MovieInfoSchema.statics.addMovieToDB = function(movieInfoObj, cb) {
	MovieInfo.create({
		imdbID:movieInfoObj.imdbID,
		imdbURL:movieInfoObj.imdbURL,
		title:movieInfoObj.title,
		imageURL:movieInfoObj.imageURL,
		yearReleased:movieInfoObj.yearReleased,
		starring:movieInfoObj.starring
	}, function(err, newMovie) {
		if(err) {
			console.log(err);
			return cb(err);
		} else {
			return cb(null, newMovie);
		}
	});
};

MovieItemSchema.statics.fetchMovieBy = function(movieItemObj, cb) {
	MovieItem.findOne({
		_id: movieItemObj._id
	}, function(err, dbMovieItem) {
		if (err || !dbMovieItem) {
			return cb("Fetch failed.");
		}
		return cb(null, dbMovieItem);
	});
};

MovieItem = mongoose.model('MovieItem', MovieItemSchema);
module.exports = MovieItem;
'use strict';
var mongoose=require('mongoose');
var ListItem;

var ListItemSchema = new mongoose.Schema({
	movieInfo:{type: mongoose.Schema.Types.ObjectId, ref: 'MovieInfo', required:true},	//	id might even be imdb id, who knows.
	userID:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},				//	links back to user, allows us to query ListItems and get owning User
	type:String	//	'have' if user has this movie; 'want' if user wants this movie
});

//	ensures that a movieInfo+userID+type combination are unique;
//	or, in plain terms, makes sure a user has no duplicates in each list
ListItemSchema.index({ movieInfo: 1, userID: 1, type:1 }, { unique: true });

ListItemSchema.statics.fetchListItem = function(userID, movieInfoID, type, cb) {
	ListItem.find({
		userID:userID,
		movieInfo:movieInfoID,
		type:type
	})
	.populate('movieInfo')
	.exec(function(err, dbListItem) {
		if (err || !dbListItem) {
			return cb(err);
		}
		return cb(null, dbListItem);
	});
};


ListItemSchema.statics.fetchList = function(userID, type, cb) {
	ListItem.find({
		userID:userID,
		type:type
	})
	.select('movieInfo type')
	.populate('movieInfo')
	.exec(function(err, dbListItems) {
		if (err || !dbListItems) {
			return cb(err);
		}
		return cb(null, dbListItems);
	});
};

ListItemSchema.statics.addMovieToUserList = function(listItemObj, cb) {
//	no need to create a new listItem object to pass to this function,
//	just wrap the data in an in-place object:
//	{movieInfo:movieID, userID:user_id, type:'have'/'want'}
	ListItem.create({
		movieInfo:listItemObj.movieInfoID,
		userID:listItemObj.userID,
		type:listItemObj.type
	})
	.populate('movieInfo')
	.exec(function(err, newListItem) {
		if(err.name==='MongoError' && err.code==='11000') {
			//	Error 11000 is a Duplicate Index error, which means
			//	user already has this movie in this list.
			//
			//	It's not necessarily a bad thing, really, so
			//	we silently ignore the error & reply with the existing item
			return ListItem.fetchListItem(listItemObj.userID, listItemObj.userID, listItemObj.type, cb);
		} else if(err) {
			console.log(err);
			return cb(err);
		} else {
			return cb(null, newListItem);
		}
	});
};

ListItemSchema.statics.removeMovieFromUserList = function(listItemObj, cb) {
//	no need to create a new listItem object to pass to this function,
//	just wrap the data in an in-place object:
//	{movieInfo:movieID, userID:user_id, type:'have'/'want'}
	ListItem.findOneAndRemove({
		movieInfo:listItemObj.movieInfoID,
		userID:listItemObj.userID,
		type:listItemObj.type
	}, function(err, newUser) {
		if(err) {
			console.log(err);
			return cb(err);
		} else {
			return cb(null, "Removed successfully...?");
		}
	});
};


//	returns all users that have/want the specified movieID
ListItemSchema.statics.fetchByMovieID = function(movieID, haveOrWant, cb) {
	ListItem.find({
		movieInfo:movieID,
		type:haveOrWant
	})
	.populate('userID')
	.exec(function(err, dbResult) {
		if (err || !dbResult) {
			return cb("FetchByMovieID failed.");
		}
		return cb(null, dbResult);
	});
};





User = mongoose.model('User', UserSchema);
module.exports = User;
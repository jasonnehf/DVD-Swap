'use strict';
var mongoose=require('mongoose');
var User;

var UserSchema = new mongoose.Schema({
	authID:{type:String, required:true, unique:true},
	accountStatus:{type:String},

	email:{type:String, required:true},
	displayName:{type:String},
	gravatarURL:{type:String},	//	use

	haveList:[{type: mongoose.Schema.Types.ObjectId, ref: 'ListItem'}],
	wantList:[{type: mongoose.Schema.Types.ObjectId, ref: 'ListItem'}],

	ignoredUsers:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

UserSchema.statics.fetch = function(userObj, cb) {
	User.findOne({
		authID: userObj.authID
	}, function(err, dbUser) {
		if (err || !dbUser) {
			return cb("Fetch failed.");
		}
		return cb(null, dbUser);
	});
};

UserSchema.statics.modify = function(userObj, cb) {
	User.findOneAndUpdate({
		authID: userObj.authID
	}, {
		email:userObj.email,
		displayName:userObj.displayName,
		gravatarURL:userObj.gravatarURL,
	},
	function(err, dbUser) {
		if (err || !dbUser) {
			return cb("Fetch failed.");
		}
		return cb(null, dbUser);
	});
};

UserSchema.statics.register = function(userObj, cb) {
	// console.log(userObj.id);
	User.create({
		authID: userObj.authID,	//	from Stormpath authentication
		accountStatus:userObj.accountStatus,	//	may not need?
		email:userObj.email,		//	will be confirmed by stormpath
		displayName:userObj.displayName,	//
		gravatarURL:userObj.gravatarURL,
		haveList:[],
		wantList:[],
		ignoredUsers:[]

	}, function(err, newUser) {
		if(err) {
			console.log(err);
			return cb(err);
		} else {
			return cb(null, newUser);
		}
	});
};

UserSchema.statics.register = function(userObj, cb) {
	// console.log(userObj.id);
	User.create({
		authID: userObj.authID,	//	from Stormpath authentication
		accountStatus:userObj.accountStatus,	//	may not need?
		email:userObj.email,		//	will be confirmed by stormpath
		displayName:userObj.displayName,	//
		gravatarURL:userObj.gravatarURL,
		haveList:[],
		wantList:[],
		ignoredUsers:[]

	}, function(err, newUser) {
		if(err) {
			console.log(err);
			return cb(err);
		} else {
			return cb(null, newUser);
		}
	});
};


User = mongoose.model('User', UserSchema);
module.exports = User;
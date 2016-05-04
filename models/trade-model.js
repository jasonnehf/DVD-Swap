'use strict';
var mongoose=require('mongoose');
var Trade;
var TradeSchema = new mongoose.Schema({
	firstUser:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
	secondUser:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},

	firstUserWants:{type: mongoose.Schema.Types.ObjectId, ref: 'ListItem'},
	secondUserWants:{type: mongoose.Schema.Types.ObjectId, ref: 'ListItem'},

	secondUserHasAccepted:{type:Boolean, default:false},	//	true:accepted / false:no-response/declined
	firstUserHasAccepted:{type:Boolean, default:false},	//	true:accepted / false:no-response/declined

	tradeCompleteDate:{type:Date},
});

TradeSchema.statics.fetchByID = function(id, cb) {
	Trade.findOne({
		_id: id
	})
	.populate('movieInfo')
	.exec(function(err, dbListItem) {
		if (err || !dbListItem) {
			return cb("Fetch failed.");
		}
		return cb(null, dbListItem);
	});
};
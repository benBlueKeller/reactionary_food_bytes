'use strict';

var Schema = require('mongoose').Schema;

var FoodSchema = new Schema({
	name: String,
	nddno: String,
	qty: Number,
	location: String,
	sub_location: String
});


module.exports.Food  = mongoose.model("Food", FoodSchema);
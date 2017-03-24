'use strict';

var Schema = require('mongoose').Schema;

/**
 * FoodSchema contains the standard fields as food,
 * but with the added fields of location and optional sub
 * to maintain a simplier collection 
 * @type {Schema}
 */
var FoodSchema = new Schema({
	name: String,
	nddno: String,
	qty: Number,
	location: String,
	sub_location: String
});


module.exports.Food  = mongoose.model("Food", FoodSchema);
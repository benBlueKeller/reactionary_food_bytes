'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FoodSchema = new Schema({
	name: String,
	nddno: String,
	qty: Number
});

var PantrySchema = new Schema({
	food: [FoodSchema]
});

var Pantry = mongoose.model("Pantry", PantrySchema);

module.exports.Pantry = Pantry;
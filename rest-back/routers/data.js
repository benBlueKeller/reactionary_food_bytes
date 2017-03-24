'use strict';

var express = require("express");
var router = express.Router();
var Food = require("../models").Food;

//GET /data
//Route for all food in all locations
router.get("/", function(req, res, next){
	Food.find({})
				.exec(function(err, food){
					if(err) return next(err);
					res.json(food);
				});
});

module.exports = router;
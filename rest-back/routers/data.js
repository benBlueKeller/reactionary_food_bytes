'use strict';

var express = require("express");
var router = express.Router();
var Food = require("../models").Food;

router.param("fID", function(req, res, next, id){
	Food.findById(id, function(err, doc){
		if(err) return next(err);
		if(!doc) {
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.item = doc;
		return next();
	});
});

//GET /data
//Route for all food in all locations
router.get("/", function(req, res, next){
	Food.find({})
				.exec(function(err, food){
					if(err) return next(err);
					res.json(food);
				});
});

// POST /food
// Route for creating food items
router.post("/", function(req, res, next){
	var item = new Food(req.body);
	item.save(function(err, item){
		if(err) return next(err);
		res.status(201);
		res.json(item);
	});
});

// GET /data/:id
// Route for specific food
router.get("/:fID", function(req, res, next){
	res.json(req.item);
});

//PUT /data/:id
//Edit a food item
router.put("/:fID", function(req, res, next) {
	req.item.update(req.body, function(err, result){
		if(err) return next(err);
		res.json(result);
	});
});


// DELETE /data/:fID
// Delete a specific food item
router.delete("/:fID", function(req, res, next){
	req.item.remove(function(err){
		if(err) return next(err);
		res.status(202);
		res.json({ deleted: req.item});
		next();
	});
});

module.exports = router;
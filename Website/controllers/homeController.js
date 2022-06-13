const mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;






// controller actions
module.exports.home_get = async (req, res) => {
	res.status(200).render('home/home');
};



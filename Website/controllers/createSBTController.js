const mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;


// controller actions
module.exports.createSBT_get = async (req, res) => {
	res.status(200).render('createSBT/createSBT');
};

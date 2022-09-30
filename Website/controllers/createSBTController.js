// import ipfsClient from 'ipfs-http-client';

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol:'https' });



const mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;



// controller actions
module.exports.createSBT_get = async (req, res) => {
	res.status(200).render('createSBT/createSBT');
};


module.exports.createSBT_post = async (req, res) => {
	try {

		let { SBTName, SBTPicture, SBTDescription, SBTCity, SBTCountry, SBTStartDate, SBTEndDate, SBTWebsite }  = req.body;

		console.log(SBTPicture);

		// ipfs.files.add(testBuffer, function (err, file) {
	 //        if (err) {
	 //        	console.log(err);
	 //        }
	 //        console.log(file);
  //     	});



	} catch (err) {
		res.status(400).json({ errors: "error in createSBTController" })
	}
}
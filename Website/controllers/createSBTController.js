import { initIpfs, addFileToIPFS } from '../models/ipfs.js';
import Soulbounder from '../builtContracts/Soulbounder.json' assert { type: "json"};
import Web3 from 'web3';
import stream from 'stream';
import streamifier from 'streamifier';
import fs from 'fs';

// controller actions
export const createSBT_get = async (req, res) => {
	res.status(200).render('createSBT/createSBT');
};


export const createSBT_post = async (req, res) => {

	let networkDataList = Soulbounder.networks;
	var contractNetworkId;

	for (var key in networkDataList) {
		contractNetworkId = key;
	}

	const contractAbi = Soulbounder.abi;
	const networkData = Soulbounder.networks[contractNetworkId];
	const contractAddress = networkData.address;

	const buffer = Buffer.from(req.body.SBTPicture, 'base64');
	console.log('myBuffer: ', buffer);

	// Generate random string of numbers to act as temp file name
	const randomInt = Math.floor(Math.random() * 1000).toString();
	const imagePath = `./public/tempImages/${randomInt}`;
	// Save the buffer to a file
	fs.writeFile(imagePath, buffer, (err) => {
	  if (err) {
	    console.error("Error saving image buffer to application: ", err);
	    return;
	  }

	  console.log('The image file was saved!');
	});



	if (req.body.sbtType == "Account") {

		let trait_types = ["Type","Email"];
		let values = ["Account",req.body.emailInput];

		const blankInputLabels = req.body.blankInputLabel;
		if (Array.isArray(blankInputLabels)) {
		  for (const label of blankInputLabels) {
		  	trait_types.push(label);
		  }
		} else {
			trait_types.push(blankInputLabels);
		}


		const blankInputContents = req.body.blankInputContent;
		if (Array.isArray(blankInputContents)) {
		  for (const label of blankInputContents) {
		  	values.push(label);
		  }
		} else {
			values.push(blankInputContents);
		}

		const attributes = [];
		trait_types.forEach((trait, index) => {
		  attributes.push({
		    trait_type: trait,
		    value: values[index],
		  });
		});

		const SBTData = { 
			"name" : req.body.SBTName,
			"image" : "./tempImages/"+randomInt,
		  	// "external_url": "https://soulbounder.org/SBT/hash",
		 	"description" : req.body.SBTDescription,
		 	attributes,
		};

		console.log(JSON.stringify(SBTData));

		res.status(200).render('createSBT/account', { SBTData, contractNetworkId, contractAddress, contractAbi : JSON.stringify(contractAbi) });

	}







	if (req.body.sbtType == "Attendance") {

		const SBTData = { 
			"name" : req.body.SBTName,
			"image" : "./tempImages/"+randomInt,
		  	// "external_url": "https://soulbounder.org/SBT/hash",
		 	"description" : req.body.SBTDescription,
		 	"attributes" : [
		  		{
		  			"trait_type": "Type",
		  			"value": req.body.sbtType
		  		},
		  		{
		  			"trait_type": "City",
		  			"value": req.body.SBTCity
		  		},
		  		{
		  			"trait_type": "Country",
		  			"value": req.body.SBTCountry
		  		},
		  		{
		  			"trait_type": "Start Date",
		  			"value" : req.body.SBTStartDate	
		  		},
		  		{
		  			"trait_type": "End Date",
		  			"value" : req.body.SBTEndDate
		  		},
		  		{
		  			"trait_type": "Website",
		  			"value" : req.body.SBTWebsite
		  		},
		  	]
		};

		console.log(JSON.stringify(SBTData));

		res.status(200).render('createSBT/attendance', { SBTData, contractNetworkId, contractAddress, contractAbi : JSON.stringify(contractAbi) });

	}
}








export const blockchain_post = async (req, res) => {

	try {
			// Read the contents of the temp file
			const imageBuffer = fs.readFileSync('./public/'+req.body.SBTData.image);

			// Use the unlink() method to delete the temporary file
			fs.unlink('./public/'+req.body.SBTData.image, (err) => {
			  if (err) {
			    console.error(err);
			    return;
			  }
			  console.log('File deleted successfully');
			});

			const ipfs = await initIpfs();
			const pictureAdded = await addFileToIPFS(imageBuffer, ipfs);
			console.log("Added file CID:", pictureAdded);

			const imagePath = `./public/SBT-image/${pictureAdded.path}`;
			// Save the buffer to a file
			fs.writeFile(imagePath, imageBuffer, (err) => {
			  if (err) {
			    console.error("Error saving image buffer to application: ", err);
			    return;
			  }

			  console.log('The image file was saved!');
			});

			let attributes = req.body.SBTData.attributes;

			const sbtMetadata = { 
				"name" : req.body.SBTData.name,
			  	"image" : "https://soulbounder.infura-ipfs.io/ipfs/"+pictureAdded.path,
			  	"path" : pictureAdded.path,
			  	// "external_url": "https://soulbounder.org/SBT/hash",
			  	"description" : req.body.SBTData.description,
			  	attributes,
			  };

			console.log(JSON.stringify(sbtMetadata));

			const sbtHash = await addFileToIPFS(JSON.stringify(sbtMetadata), ipfs);
			console.log("Added file (CID):", sbtHash);
			const path =  sbtHash.path.toString();
			console.log("Path:", path);

			const metadataPath = `./public/SBT-data/${sbtHash.path}`;
			// Save the buffer to a file
			fs.writeFile(metadataPath, JSON.stringify(sbtMetadata), (err) => {
			  if (err) {
			    console.error("Error saving metadata to application: ", err);
			    return;
			  }

			  console.log('The metadata file was saved!');
			});

			res.status(201).json({ sbtHash: sbtHash.path });

	} catch (err) {
			console.error("Error in uploading IPFS data: ", err);
			res.status(400).json({ errors: "Error in uploading IPFS data: ", err });
	}

}




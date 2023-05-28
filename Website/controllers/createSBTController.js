import { initIpfs, addFileToIPFS } from '../models/ipfs.js';
import Soulbounder from '../builtContracts/Soulbounder.json' assert { type: "json"};
import Web3 from 'web3';
import stream from 'stream';
import streamifier from 'streamifier';
import fs from 'fs';

// controller actions
export const createSBT_get = async (req, res) => {
	let networkDataList = Soulbounder.networks;
	var contractNetworkId;

	for (var key in networkDataList) {
		contractNetworkId = key;
	}

	const contractAbi = Soulbounder.abi;
	const networkData = Soulbounder.networks[contractNetworkId];
	const contractAddress = networkData.address;

	res.status(200).render('createSBT/createAccount', { contractNetworkId, contractAddress, contractAbi : JSON.stringify(contractAbi) });
};






export const blockchain_post = async (req, res) => {

	try {
			const imageBuffer = new Buffer.from(req.body.SBTData.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');

			const ipfs = await initIpfs();
			const pictureAdded = await addFileToIPFS(imageBuffer, ipfs);
			console.log("Added file CID:", pictureAdded);

			let attributes = req.body.SBTData.attributes;

			const sbtMetadata = { 
				"name" : req.body.SBTData.name,
			  	"image" : "https://soulbounder.infura-ipfs.io/ipfs/"+pictureAdded.path,
			  	"path" : pictureAdded.path,
			  	// "external_url": "https://soulbounder.org/SBT/hash",
			  	attributes,
			  };

			console.log(JSON.stringify(sbtMetadata));

			const sbtHash = await addFileToIPFS(JSON.stringify(sbtMetadata), ipfs);
			console.log("Added file (CID):", sbtHash);
			const path =  sbtHash.path.toString();
			console.log("Path:", path);

			res.status(201).json({ sbtHash: sbtHash.path });

	} catch (err) {
			console.error("Error in uploading IPFS data: ", err);
			res.status(400).json({ errors: "Error in uploading IPFS data: ", err });
	}

}




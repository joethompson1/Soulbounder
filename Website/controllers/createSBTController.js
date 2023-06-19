import { initIpfs, addFileToIPFS, unpinFileFromIPFS } from '../models/ipfs.js';
import { encryptData } from '../models/metamask/encryptData.js';
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

	res.status(200).render('createSBT/createAccount', 
		{ contractNetworkId, contractAddress, contractAbi : JSON.stringify(contractAbi) });
}




export const blockchain_post = async (req, res) => {

	let pictureAdded;

	try {
			const publicKey = Buffer.from(req.body.keyB64, 'base64');
			const imageBuffer = new Buffer.from(req.body.SBTData.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');

			let ipfs, sbtHash;

			try {

				ipfs = await initIpfs();

			} catch (error) {

				console.error("Error initialising Infura IPFS: ", error.message);

			}

			if (!ipfs) {
				throw new Error("Unable to establish connection with Infura IPFS");
			}

			pictureAdded = await addFileToIPFS(imageBuffer, ipfs);
			console.log("Added file CID:", pictureAdded);

			let attributes = req.body.SBTData.attributes;

			for (let i = 1; i < attributes.length; i++ ) {
				attributes[i].value = encryptData(publicKey, Buffer.from(JSON.stringify(attributes[i].value)));
			}

			const sbtMetadata = { 
				"name" : req.body.SBTData.name,
			  	"image" : "https://soulbounder.infura-ipfs.io/ipfs/"+pictureAdded.path,
			  	"path" : pictureAdded.path,
			  	// "external_url": "https://soulbounder.org/SBT/hash",
			  	attributes,
			  };

			sbtHash = await addFileToIPFS(JSON.stringify(sbtMetadata), ipfs);
			console.log("Added file (CID):", sbtHash);
			const path =  sbtHash.path.toString();

			res.status(201).json({ sbtHash: sbtHash.path, pictureHash: pictureAdded.path });

	} catch (err) {

		if (pictureAdded) {
			console.log("Unpinning picture from Infura IPFS");
			unpinFileFromIPFS(pictureAdded.path);
		}

		if (sbtHash) {
			console.log("Unpinning SBT metadata from Infura IPFS");
			unpinFileFromIPFS(sbtHash.path);
		}

		console.error("Error in uploading IPFS data: ", err);
		res.status(400).json({ errors: "Error in uploading IPFS data: ", err });

	}

}




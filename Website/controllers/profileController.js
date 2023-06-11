
import { initIpfs, addFileToIPFS } from '../models/ipfs.js';
import { decryptData } from '../models/metamask/decryptData.js';
import { encryptData } from '../models/metamask/encryptData.js';
import Soulbounder from '../builtContracts/Soulbounder.json' assert { type: "json"};
import Web3 from 'web3';




// controller actions
export const profile_get = async (req, res) => {

	let networkDataList = Soulbounder.networks;
	var contractNetworkId;

	for (var key in networkDataList) {
		contractNetworkId = key;
	}

	const contractAbi = Soulbounder.abi;
	const networkData = Soulbounder.networks[contractNetworkId];
	const contractAddress = networkData.address;

	res.status(200).render('profile/profile', { contractNetworkId, contractAddress, contractAbi : JSON.stringify(contractAbi) });
};








export const edit_get = async (req, res) => {

	// Get the SBT metadata from the profile page
	const SBTData = req.query.SBTData;

	let networkDataList = Soulbounder.networks;
	var contractNetworkId;

	for (var key in networkDataList) {
		contractNetworkId = key;
	}

	const contractAbi = Soulbounder.abi;
	const networkData = Soulbounder.networks[contractNetworkId];
	const contractAddress = networkData.address;

	res.status(200).render('profile/edit', { SBTData, contractNetworkId, contractAddress, contractAbi : JSON.stringify(contractAbi) });
	

}




export const edit_post = async (req, res) => {

	try {
			const sbtData = req.body.SBTData;
			const sbtEdited = req.body.sbtEdited;
			const publicKey = Buffer.from(req.body.keyB64, 'base64');


			let ipfs;

			try {

				ipfs = await initIpfs();

			} catch (error) {

				console.error("Error initialising Infura IPFS: ", error.message);

			}

			if (!ipfs) {
				throw new Error("Unable to establish connection with Infura IPFS");
			}

			let image, path;
			if (sbtEdited.image) {
				const imageBuffer = new Buffer.from(sbtData.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
				const pictureAdded = await addFileToIPFS(imageBuffer, ipfs);
				console.log("Added new Image to IPFS(CID):", pictureAdded);
				image = "https://soulbounder.infura-ipfs.io/ipfs/"+pictureAdded.path;
				path = pictureAdded.path;
			}

			else {
				image = sbtData.image;
				path = sbtData.path;
			}


			console.log("sbtEdited.attributesBool: ", sbtEdited.attributesBool);
			console.log("sbtData.attributes: ", sbtData.attributes);
			let attributes = sbtData.attributes;
			for (let i = 1; i < attributes.length; i++ ) {
				if (sbtEdited.attributesBool[i]) {
					console.log("Encrypting Data: ", attributes[i].value);
					attributes[i].value = encryptData(publicKey, Buffer.from(JSON.stringify(attributes[i].value)));
				} else {
					attributes[i].value = attributes[i].value.data;
				}
			}

			const sbtMetadata = { 
				"name" : sbtData.name,
			  	"image" : image,
			  	"path" : path,
			  	// "external_url": "https://soulbounder.org/SBT/hash",
			  	attributes,
			};

			console.log("sbtMetadata", sbtMetadata);

			const sbtHash = await addFileToIPFS(JSON.stringify(sbtMetadata), ipfs);
			console.log("Added file (CID):", sbtHash);

			res.status(201).json({ sbtHash: sbtHash.path });

	} catch (err) {
			console.error("Error in uploading IPFS data: ", err);
			res.status(400).json({ errors: "Error in uploading IPFS data: ", err });
	}

}
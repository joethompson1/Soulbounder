import * as IPFS from 'ipfs-core';
import { node } from '../server.js';
import Meme from '../builtContracts/Meme.json' assert { type: "json"};
import Web3 from 'web3';


const ifpsConfig = {
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
};


// controller actions
export const createSBT_get = async (req, res) => {
	res.status(200).render('createSBT/createSBT');
};


export const createSBT_post = async (req, res) => {

	let networkDataList = Meme.networks;
	var contractNetworkId;

	for (var key in networkDataList) {
		contractNetworkId = key;
	}

	const contractAbi = Meme.abi;
	const networkData = Meme.networks[contractNetworkId];
	const contractAddress = networkData.address;

	try {
			const buffer = Buffer.from(req.body.SBTPicture, 'base64');
			console.log('myBuffer: ', buffer);

			const pictureAdded = await node.add(buffer);
			console.log("Added file CID:", pictureAdded);

			const SBTData = { "Name" : req.body.SBTName,
							  "Picture" : "https://ipfs.io/ipfs/"+pictureAdded.path,
							  "Description" : req.body.SBTDescription,
							  "City" : req.body.SBTCity,
							  "Country" : req.body.SBTCountry,
							  "Start_Date" : req.body.SBTStartDate,
							  "End_Date" : req.body.SBTEndDate,
							  "Website" : req.body.SBTWebsite };

			console.log(JSON.stringify(SBTData));

			const sbtHash = await node.add(JSON.stringify(SBTData));
			console.log("Added file CID:", sbtHash);
			const path =  sbtHash.path.toString();
			console.log("Path:", path);

			res.status(200).render('createSBT/blockchain', { SBTData, sbtHash: path, contractNetworkId, contractAddress, contractAbi : JSON.stringify(contractAbi) });

	} catch (err) {
			console.log("error in uploading IPFS data: ", err);
			res.status(400).json({ errors: "error in uploading IPFS data: ", err });
	}

}


// Only necessary for testing
export const blockchain_get = async (req, res) => {
	let networkDataList = Meme.networks;
	var contractNetworkId;

	for (var key in networkDataList) {
		contractNetworkId = key;
	}

	const contractAbi = Meme.abi;
	const networkData = Meme.networks[contractNetworkId];
	const contractAddress = networkData.address;
	
	res.status(200).render('createSBT/blockchain', { SBTData: "https://ipfs.io/ipfs/QmdHX5KJ7mAu4VjXz2FNLPQ4NwKBT4sh8tDiEQVD45nB12", SBTHash: 'QmNnUQRr5ie1AFar8QBwMh8P3gkJ7VBoMcy8V6cshWyc51', contractNetworkId, contractAddress, contractAbi : JSON.stringify(contractAbi) });
}




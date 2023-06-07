import * as IPFS from 'ipfs-core';
import { decryptData } from '../models/metamask/decryptData.js';
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





export const decryptAuthToken = async (req, res) => {

	try {

		const account = req.body.userWalletAddress;
		const data = Buffer.from(req.body.encryptedAttribute);
		console.log("account: ", account);
		console.log("data: ", data);


		const ct = await decryptData(account, data);
		// const ct = "";

		res.status(201).json({ ct });

	} catch (err) {
		console.error("Error in decrypting Auth token: ", err);
		res.status(400).json({ errors: "Error in decrypting Auth token: ", err });
	}

}
import { initIpfs, addFileToIPFS } from '../models/ipfs.js';
import { decryptData } from '../models/metamask/decryptData.js';
import { encryptData } from '../models/metamask/encryptData.js';
import Soulbounder from '../builtContracts/Soulbounder.json' assert { type: "json"};
import { ethers } from 'ethers';
import Web3 from 'web3';


export const getAuthToken = async (req, res) => {
	try {
    	const { userWalletAddress } = req.params;
    	console.log(userWalletAddress);
    	const authToken = { tokenURI: null, tokenId: null, SBTData: null };

    	let networkDataList = Soulbounder.networks;
    	let contractNetworkId;

    	for (let key in networkDataList) {
      		contractNetworkId = key;
    	}	

    	const contractAbi = Soulbounder.abi;
    	const networkData = Soulbounder.networks[contractNetworkId];
    	const contractAddress = networkData.address;

	    // Connect to Ethereum network using a JSON-RPC provider
	    const rpcUrl = 'http://127.0.0.1:7545';
	    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
	    const signer = provider.getSigner(userWalletAddress);
	    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

	    const walletBalance = await contract.balanceOf(userWalletAddress);

	    // Runs through all the user's tokens
	    for (let i = 0; i < walletBalance.toString(); i++) {
      		const tokenId = await contract.tokenOfOwnerByIndex(userWalletAddress, i);
      		const tokenType = await contract.getTokenType(tokenId);

      	if (tokenType.toNumber() === 1) {
	        let tokenURI = await contract.tokenURI(tokenId);
	        let request = new Request("https://soulbounder.infura-ipfs.io/ipfs/" + tokenURI);
	        let response = await fetch(request);
	        let SBTData = await response.json();

	        authToken.tokenURI = tokenURI;
	        authToken.SBTData = SBTData;
	        authToken.tokenId = tokenId;
	        break;
	    }
    }

    res.status(201).json({ authToken });


  	} catch (err) {

    	console.error("Error in getting Auth token: ", err);
    	res.status(400).json({ errors: "Error in getting Auth token: ", err });

  	}
};
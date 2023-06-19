import { initIpfs, addFileToIPFS } from '../models/ipfs.js';
import { decryptData } from '../models/metamask/decryptData.js';
import { encryptData } from '../models/metamask/encryptData.js';
import Soulbounder from '../builtContracts/Soulbounder.json' assert { type: "json"};
import { ethers } from 'ethers';
import Web3 from 'web3';



function getProvider() {
	const rpcUrl = 'http://127.0.0.1:7545';
	const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
	return provider;
}


export const getAuthToken = async (req, res) => {
	let authToken = { tokenURI: null, tokenId: null, SBTData: null };

	try {
    	const { userWalletAddress } = req.params;

    	let networkDataList = Soulbounder.networks;
    	let contractNetworkId;


    	for (let key in networkDataList) {
      		contractNetworkId = key;
    	}	

    	const contractAbi = Soulbounder.abi;
    	const networkData = Soulbounder.networks[contractNetworkId];
    	const contractAddress = networkData.address;

	    // Connect to Ethereum network using a JSON-RPC provider
	    const provider = getProvider();
	    const signer = provider.getSigner(userWalletAddress);
	    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
	    let walletBalance

	    try {
		    
		    walletBalance = await contract.balanceOf(userWalletAddress);

	    } catch (error) {

	    	console.error("Error in reading smart contract");
	    	error.reason = "Error: Soulbounder smart contract not deployed to selected network";
	    	return res.status(400).json({ errors: error });
	    }


	    // Runs through all the user's tokens
	    for (let i = 0; i < walletBalance.toString(); i++) {
      		let tokenId = await contract.tokenOfOwnerByIndex(userWalletAddress, i);
      		const tokenType = await contract.getTokenType(tokenId);

	      	if (tokenType.toNumber() === 1) {
		        let tokenURI = await contract.tokenURI(tokenId);
		        tokenURI = tokenURI.replace(/"/g, '');
		        authToken.tokenURI = tokenURI;
		        authToken.tokenId = tokenId.toNumber();

		        const url = `https://soulbounder.infura-ipfs.io/ipfs/${tokenURI}`;
		        let request = new Request(url);
		        let response = await fetch(request);


		        if (response.status != 200) {
		        	const error = new Error("token metadata does not exist on IPFS");
		        	error.reason = "token metadata does not exist on IPFS";
		        	return res.status(400).json({ errors: error, authToken })
		        }

		        let SBTData = await response.json();
		        authToken.SBTData = SBTData;
		        break;
		    }
	    }

	    res.status(201).json({ authToken });



  	} catch (error) {

    	console.error("Error in getting Auth token: ", error.message );
    	res.status(400).json({ errors: error.message, authToken });

  	}
};







export const decryptAttribute = async (req, res) => {

	try {

		const userWalletAddress = req.body.userWalletAddress;
		const encryptedData = Buffer.from(req.body.encryptedAttribute);
		const ct = await decryptData(userWalletAddress, encryptedData);

		res.status(201).json({ ct });


	} catch (err) {
		console.error("Error in decrypting attribute: ", err);
		res.status(400).json({ errors: "Error in decrypting attribute: ", err });
	}

};







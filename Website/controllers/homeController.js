import Web3 from 'web3';
import Meme from '../truffle/build/Meme.json' assert { type: "json"};

// controller actions
export const home_get = async (req, res) => {
	let networkDataList = Meme.networks;
	var contractNetworkId;

	for (var key in networkDataList) {
		contractNetworkId = key;
	}

	const contractAbi = Meme.abi;
	const networkData = Meme.networks[contractNetworkId];
	const contractAddress = networkData.address;

	// console.log(contractAbi);

	res.status(200).render('home/home', { contractNetworkId, contractAddress, contractAbi : JSON.stringify(contractAbi) });
};



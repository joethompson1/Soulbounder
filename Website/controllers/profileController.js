import * as IPFS from 'ipfs-core';
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






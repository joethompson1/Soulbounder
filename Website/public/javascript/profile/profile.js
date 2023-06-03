async function loadAccountSBT(contractAbi, contractAddress, userWalletAddress) {
	const accountSBT = { tokenURI: null, SBTData: null};

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner(userWalletAddress);
	const contract = new ethers.Contract(contractAddress, contractAbi, signer);

	console.log(contract);

	walletBalance = await contract.balanceOf(userWalletAddress);
	console.log("walletBalance: ", walletBalance.toString());

	// Runs through all the users tokens
	for (var i=0; i < walletBalance.toString(); i++) {
		const tokenId = await contract.tokenOfOwnerByIndex(userWalletAddress, i);
		console.log("tokenId: ", tokenId);

		const tokenType = await contract.getTokenType(tokenId);
		console.log("tokenType: ", tokenType.toNumber());

		if (tokenType.toNumber() == 1) {
			let tokenURI = await contract.tokenURI(tokenId);
			let request = new Request("https://soulbounder.infura-ipfs.io/ipfs/"+tokenURI);
			let response = await fetch(request);
			let SBTData = await response.json();
			console.log("SBTData: ", SBTData.data);

			accountSBT.tokenURI = tokenURI;
			accountSBT.SBTData = SBTData.data;
		}
		
	}
	// console.log(accountSBT);
	return accountSBT;
};



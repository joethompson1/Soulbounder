async function loadAccountSBT(contractAbi, contractAddress, userWalletAddress) {
	const accountSBT = { tokenURI: null, SBTData: null};

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner(userWalletAddress);
	const contract = new ethers.Contract(contractAddress, contractAbi, signer);

	walletBalance = await contract.balanceOf(userWalletAddress);

	// Runs through all the users tokens
	for (var i=0; i < walletBalance.toString(); i++) {
		const tokenId = await contract.tokenOfOwnerByIndex(userWalletAddress, i);

		let tokenURI = await contract.tokenURI(tokenId);
		let request = new Request("https://soulbounder.infura-ipfs.io/ipfs/"+tokenURI);
		// let request = new Request("/SBT-data/"+tokenURI);
		let response = await fetch(request);
		let SBTData = await response.json();

		if (SBTData.attributes[0].value == "Account") {
			accountSBT.tokenURI = tokenURI;
			accountSBT.SBTData = SBTData;
		}
		
	}
	return accountSBT;
};



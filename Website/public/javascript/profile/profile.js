async function loadAccountSBT(contractAbi, contractAddress, userWalletAddress) {
	const accountSBT = { tokenURI: null, SBTData: null};

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner(userWalletAddress);
	const contract = new ethers.Contract(contractAddress, contractAbi, signer);

	walletBalance = await contract.balanceOf(userWalletAddress);

	// Runs through all the users tokens
	for (var i=0; i < walletBalance.toString(); i++) {
		const tokenId = await contract.tokenOfOwnerByIndex(userWalletAddress, i);
		const tokenType = await contract.getTokenType(tokenId);

		if (tokenType.toNumber() == 1) {
			let tokenURI = await contract.tokenURI(tokenId);
			let request = new Request("https://soulbounder.infura-ipfs.io/ipfs/"+tokenURI);
			let response = await fetch(request);
			let SBTData = await response.json();

			accountSBT.tokenURI = tokenURI;
			accountSBT.SBTData = SBTData.data;
		}
		
	}

	return accountSBT;
};




async function decryptAuthToken(userWalletAddress, accountSBT) {
	const res = await fetch('/profile/decryptAuthToken', { 
	  method: 'POST', 
	  body: JSON.stringify({ userWalletAddress, SBTData: accountSBT.SBTData}),
	  headers: {'Content-Type': 'application/json'}
	});

	data = await res.json();

	let decrypt = await ethereum.request({
	    method: 'eth_decrypt',
	    params: [data.ct, userWalletAddress],
	 });

	const decryptJson = JSON.parse(decrypt);
	const buffer = new Uint8Array(decryptJson.data);
	const decoder = new TextDecoder('utf-8');
	const SBTData = JSON.parse(decoder.decode(buffer));

	return SBTData;
}




async function clearAuthContainers() {
	const container__left = document.getElementById('container__left');
	const container__right = document.getElementById('container__right');
	container__left.innerHTML = "";
	container__right.innerHTML = "";
}
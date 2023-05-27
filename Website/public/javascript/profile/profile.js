async function loadAllUsersSBTs(contractAbi, contractAddress, userWalletAddress) {
	const 	account = new Map(),
			attendance = new Map(), 
			certificates = new Map(), 
			tickets = new Map();

	tabsMap.set('Account', account);
	tabsMap.set('Attendance', attendance);
	tabsMap.set('Certificates', certificates);
	tabsMap.set('Tickets', tickets);

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

		let chosenMap = tabsMap.get(SBTData.attributes[0].value)
		chosenMap.set(tokenURI, SBTData);
	}
};



function changeTab(tabId) {
	for (const [tabKey, value] of tabsMap) {
		let tab = document.getElementById(tabKey);
		if (tab.classList.contains('active')) {
			tab.classList.remove('active');
		}
	}

	let chosenTab = document.getElementById(tabId);
	chosenTab.classList.add("active");
	window.location.hash = tabId;

	let tabContents = document.getElementById('container__profile-viewSBTs');
	let color = window.getComputedStyle(chosenTab).backgroundColor;
	tabContents.style.backgroundColor = color;

	showSbtTiles(tabsMap.get(tabId));
}




function showSbtTiles(tabMap) {
	const sbtContainer = document.getElementById("container__profile-viewSBTs");
	sbtContainer.innerHTML = "";

	for (const [tokenURI, SBTData] of tabMap) {
		const container__sbt = document.createElement("a");
		container__sbt.className = 'container__sbt';
		let href = "/profile/viewSBT#"+tokenURI;
		container__sbt.setAttribute('href', href);

		var sbtImage = new Image();
		sbtImage.className = 'sbtImage';
		sbtImage.src = SBTData.image;
		// sbtImage.src = "./SBT-image/"+SBTData.path;

		const sbtName = document.createElement("h2");
		sbtName.className = "sbtName";
		sbtName.textContent = SBTData.name;

		container__sbt.appendChild(sbtImage);
		container__sbt.appendChild(sbtName);
		sbtContainer.appendChild(container__sbt);
	}
}
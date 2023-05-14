
async function loadSBTData(contractAbi, contractAddress, userWalletAddress) {

	let provider = new ethers.providers.Web3Provider(window.ethereum);
	let signer = provider.getSigner(userWalletAddress);
	let contract = new ethers.Contract(contractAddress, contractAbi, signer);

	const tokenURI = window.location.hash.substring(1);
	let request = new Request("https://soulbounder.infura-ipfs.io/ipfs/"+tokenURI);
	// let request = new Request("/SBT-data/"+tokenURI);
	let response = await fetch(request);
	let SBTData = await response.json();

	document.getElementById("imageSBT").src = SBTData.image;
	// document.getElementById("imageSBT").src = "/SBT-image/"+SBTData.path;

	let name = document.getElementById('SBTName');
	name.innerHTML = SBTData.name;

	let type = document.getElementById('SBTType');
	type.innerHTML = SBTData.attributes[0].value;

	let description = document.getElementById('descriptionContents');
	description.innerHTML = SBTData.description;

	let city = document.getElementById('city');
	let country = document.getElementById('country');
	city.innerHTML = SBTData.attributes[1].value;
	country.innerHTML = SBTData.attributes[2].value;

	let startDate = document.getElementById('startDate');
	let endDate = document.getElementById('endDate');
	startDate.innerHTML = SBTData.attributes[3].value;
	endDate.innerHTML = SBTData.attributes[4].value;

	let website = document.getElementById('SBTWebsite');
	website.innerHTML = SBTData.attributes[5].value;

}



function hideContents(contentId) {
	document.getElementById(contentId).classList.toggle('show');
}
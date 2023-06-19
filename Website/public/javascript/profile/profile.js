

async function connectAuthToken(userWalletAddress) {
	if (!userWalletAddress) {
		noAuthFound.style.display = "block";
		console.error("Wallet not connected.");
	}
	
	setWalletToConnected();

	const networkVersion = ethereum.networkVersion;
	if (networkVersion != 5777) { // Checks user has Ganache selected as their network
		correctNetwork = false;
		console.error("Wrong blockchain network selected.");
		const error = new Error();
		error.reason = "Wrong blockchain network selected";
		handleError(error);
		// clearAuthContainers();
		const mainContents = document.getElementById('container__mainContents');
		mainContents.style.display = "none";
	}

	else {

		let data;


	    // Make a GET request to the getAuthToken API endpoint
	    const response = await fetch(`/api/getAuthToken/${userWalletAddress}`);
	    data = await response.json();
	    authToken = data.authToken;

		if (authToken.tokenURI) {

			if (authToken.SBTData) {
				for (let i = 1; i < authToken.SBTData.attributes.length; i++) {
					encryptedAttributes.push(authToken.SBTData.attributes[i].value);
				}
				viewAccountSBT(authToken);
			}

			else {
				if (data.errors) {
					handleError(data.errors);
				}
			}
		} 

		else {
			clearAuthContainers();
			if (data.errors) {
				const error = new Error(data.errors);
				handleError(error);
			}

			noAuthFound.style.display = "block";
			console.error("No Auth token found in wallet.");
		}
	}
	
}





async function decryptAuthAttribute(userWalletAddress, encryptedAttribute) {
	const response = await fetch('/api/decryptAttribute', { 
	  method: 'POST', 
	  body: JSON.stringify({ userWalletAddress, encryptedAttribute}),
	  headers: {'Content-Type': 'application/json'}
	});


	data = await response.json();
	let decryptedAttribute;

	try {
		let decrypt = await ethereum.request({
		    method: 'eth_decrypt',
		    params: [data.ct, userWalletAddress],
		});

		const decryptJson = JSON.parse(decrypt);
		const buffer = new Uint8Array(decryptJson.data);
		const decoder = new TextDecoder('utf-8');
		decryptedAttribute = JSON.parse(decoder.decode(buffer));

	} catch (error) {
		console.error("Error decrypting Auth token: ", error);
	}

	return decryptedAttribute;
}





async function revealAttribute(event) {
	const attributeId = event.target.dataset.attributeId;	
	const decryptedAttribute = await decryptAuthAttribute(userWalletAddress, encryptedAttributes[attributeId]);
	
	if (decryptedAttribute) {
		const revealAttribute = document.getElementById(attributeId);
		revealAttribute.innerHTML = decryptedAttribute;

		const revealButton = event.target; // Get the button element
	    revealButton.style.transition = 'opacity 0.5s'; // Set the transition property

	    // Fade the button to opacity 0
	    revealButton.style.opacity = '0';

	    // Optional: Add a callback to remove the button from the DOM after the fade
	    revealButton.addEventListener('transitionend', function() {
	      revealButton.parentNode.removeChild(revealButton);
	    });
	}

}




function clearAuthContainers() {
	const container__left = document.getElementById('container__left');
	const container__right = document.getElementById('container__right');
	container__left.innerHTML = "";
	container__right.innerHTML = "";
}


function resetAuthContainers() {
	const imageSBT = document.getElementById('imageSBT');
	if (imageSBT) { imageSBT.src = "/images/loading2.svg"; }
	const sbtName = document.getElementById('SBTName');
	if (sbtName) { sbtName.textContent = ""; }
	const attributeContainer = document.getElementById('container__attributes');
	attributeContainer.innerHTML = "";
}




async function burnToken(tokenId) {
	try {
		console.log('Burning token with ID:', tokenId);

		const userWalletAddress = await setUserWallet();
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner(userWalletAddress);

		const contract = new ethers.Contract(contractAddress, contractAbi, signer);
		let burnResult = await contract.burn(tokenId);

		let txReceipt = await provider.getTransactionReceipt(burnResult.hash);

		while (!txReceipt && !txReceipt.blockNumber) {
			txReceipt = await provider.getTransactionReceipt(burnResult.hash);
		}

		window.location.href = `/home`;


	} catch (error) {
		// Handle any errors
		console.error('Error burning token:', error);
	}
}













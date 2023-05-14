


// If the wallet is not connected, show "Connect Wallet" text and change the status light
function entersWalletConnect(connectionText) { // First function called when mouse enters element
	if (connectionText === 'Wallet not connected') {
  		$('.text__status').text('Connect Wallet');
  		document.getElementById('container__statusLight').style.background="lightgreen";
	}
	// If the wallet is connected, show "Refresh wallet" text
	else if (connectionText === 'Wallet connected') {
  		$('.text__status').text('Refresh wallet');
	}
}

// When the user stops hovering over the container, show the original text and status light
function leavesWalletConnect(connectionText, statusLight) { // Second function called when mouse leaves element
	$('.text__status').text(connectionText);
	document.getElementById('container__statusLight').style.background=statusLight;
}



function setWalletToConnected() {
	document.querySelector('.text__status').innerHTML = "Wallet connected";
	document.getElementById('container__statusLight').style.background = "lightgreen";
	connectionText = document.getElementById("text__status").innerHTML;
	statusLight = document.getElementById('container__statusLight').style.background;
}



async function setUserWallet() {
	const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	const userWalletAddress = accounts[0];
	localStorage.setItem('userWalletAddress', userWalletAddress);
	return userWalletAddress;
}
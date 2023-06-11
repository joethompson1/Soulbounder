

function readURL(input) {
	sbtEdited.image = true;
	var base64String = "";
	const imageLabel = document.getElementById('imageLabel');

	if (input.files && input.files[0]) {
		const file = input.files[0];
		var reader = new FileReader();

		imageLabel.classList.remove('invalidImage');

		reader.onload = function (e) {
			$('#displayImage').attr('src', e.target.result);

			base64String = reader.result.split(',')[1];
			$('input.SBTPicture').val(base64String);

		}

		reader.readAsDataURL(input.files[0]);
	}
}



function createCustomAttributes(numberOfCustomInputs) {
	numberOfCustomInputs += 1;
	sbtEdited.attributesBool.push(true);
	var repeatingInputContainer = document.getElementById('repeatingInputContainer');

	const container__attribute = document.createElement('div');
	container__attribute.className = 'container__attribute';
	container__attribute.id = 'customAttribute'+numberOfCustomInputs;

	const container__title = document.createElement('div');
	container__title.className = 'container__description-title';

	var descriptionIcon = new Image();
	descriptionIcon.src = '/images/description.svg';
	descriptionIcon.className = 'descriptionIcon';
	container__title.appendChild(descriptionIcon);

	const descriptionTitle = document.createElement('input');
	descriptionTitle.className = 'customTitle';
	descriptionTitle.id = 'customTitle'+numberOfCustomInputs;
	descriptionTitle.required = true;
	container__title.appendChild(descriptionTitle);
	
	container__title.innerHTML += `<div class="closeInputButton" id="closeInputButton${numberOfCustomInputs}" onclick="closeInput('customAttribute${numberOfCustomInputs}')">X</div>`;

	const container__description__contents = document.createElement('div');
	container__description__contents.className = 'container__description-contents';

	const descriptionContents = document.createElement('input');
	descriptionContents.className = 'descriptionContents';
	descriptionContents.required = true;
	descriptionContents.type = "text";
	container__description__contents.appendChild(descriptionContents);

	container__attribute.appendChild(container__title);
	container__attribute.appendChild(container__description__contents);

	repeatingInputContainer.appendChild(container__attribute);

}



function closeInput(blankInputBoxX) {
	document.getElementById(blankInputBoxX).remove();
}


async function loadAuthToken() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const encodedTokenURI = urlParams.get('tokenURI');
	console.log("encodedTokenURI", encodedTokenURI);
	const tokenURI = encodedTokenURI.slice(1, -1);
	console.log("tokenURI", tokenURI);
	const tokenId = urlParams.get('tokenId');
	console.log(tokenURI);

	let request = new Request("https://soulbounder.infura-ipfs.io/ipfs/"+tokenURI);
	let response = await fetch(request);
	let SBTData = await response.json();
	const accountSBT = { tokenURI: tokenURI, SBTData: SBTData, tokenId: tokenId };

	return accountSBT;
}


function populateAuthToken(SBTData) {
	const displayImage = document.getElementById('displayImage');
	displayImage.src = SBTData.image;

	const sbtName = document.getElementById('SBTName');
	sbtName.value = SBTData.name;

	let index = 0;
	for (const attribute of SBTData.attributes) {
		if (attribute.trait_type == 'Type' || attribute.trait_type == null) {
			continue;
		}

		const min = 10, max = 35;
		let encryptedString = "";
		const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
		for (let i = 0; i < randomInt; i++) {
			encryptedString += "*";
		}


		const revealButton = document.createElement('div');
		revealButton.className = 'revealButton';
		revealButton.setAttribute('data-attribute-id', index);
		revealButton.addEventListener('click', revealAttribute);
		revealButton.id = 'revealButton'+index;

		const lockIcon = document.createElement("img");
		lockIcon.className = 'lockIcon';
		lockIcon.src = "/images/lock.svg";

		revealButton.appendChild(lockIcon);


		const container__createButtonBubble = document.createElement('div');
		container__createButtonBubble.className = 'container__createButtonBubbleDecrypt';
		
		const pointer = document.createElement('div');
		pointer.className = 'pointerDecrypt';
		container__createButtonBubble.appendChild(pointer);

		const shareH5 = document.createElement('h5');
		shareH5.textContent = 'Decrypt';
		container__createButtonBubble.appendChild(shareH5);
		revealButton.appendChild(container__createButtonBubble);

		if (index == 0) {
			const emailContents = document.getElementById('emailContents');
			emailContents.value = encryptedString;
			emailContents.addEventListener('click', function(event) {
			  revealAttribute(event);
			  event.stopPropagation(); // Stop event propagation
			  event.target.removeEventListener(event.type, arguments.callee); // Remove the event listener
			});
			emailContents.id = 0;
			const container__description = document.getElementById('containerDescription');
			container__description.appendChild(revealButton);
		}

		else {
			const container__attribute = document.createElement('div');
			container__attribute.className = 'container__attribute';


			const container__title = document.createElement('div');
			container__title.className = 'container__description-title';
			
			var descriptionIcon = new Image();
			descriptionIcon.className = 'descriptionIcon';
			if (attribute.trait_type == "Email") {
				descriptionIcon.src = "/images/email.svg";
			} else { descriptionIcon.src = "/images/description.svg"; }

			const descriptionTitle = document.createElement('h2');
			descriptionTitle.className = 'descriptionTitle';
			descriptionTitle.textContent = attribute.trait_type;


			container__title.appendChild(descriptionIcon);
			container__title.appendChild(descriptionTitle);

			const container__description = document.createElement('div');
			container__description.className = 'container__description-contents';

			const descriptionContents = document.createElement('input');
			descriptionContents.className = 'descriptionContents';
			descriptionContents.value = encryptedString;
			descriptionContents.id = index;
			descriptionContents.addEventListener('click', function(event) {
			  revealAttribute(event);
			  event.stopPropagation(); // Stop event propagation
			  event.target.removeEventListener(event.type, arguments.callee); // Remove the event listener
			});
			container__description.appendChild(descriptionContents);
			container__description.appendChild(revealButton);

			container__attribute.appendChild(container__title);
			container__attribute.appendChild(container__description);

			const repeatingInputContainer = document.getElementById('repeatingInputContainer');
			repeatingInputContainer.appendChild(container__attribute);
		}

		index++;

	}




}
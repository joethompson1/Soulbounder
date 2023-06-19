function viewAccountSBT(accountSBT) {
	const SBTData = accountSBT.SBTData;
	const container__left = document.getElementById('container__left');
	const container__right = document.getElementById('container__right');

	// Container Left
	const imageSBT = document.getElementById('imageSBT');
	imageSBT.src = SBTData.image;
	imageSBT.classList.add('fade-in');


	// Container Right
	const container__editButton = document.createElement('div');
	container__editButton.className = 'container__createButton';
	container__editButton.id = "container__editButton"
	container__editButton.addEventListener('click', (e) => {
	  const encodedURI = encodeURIComponent(JSON.stringify(accountSBT.tokenURI));
	  const tokenId = accountSBT.tokenId;
	  window.location.href = `/profile/edit?tokenURI=${encodedURI}&tokenId=${tokenId}`;
	});

	var editIcon = new Image();
	editIcon.className = 'editIcon';
	editIcon.src = '/images/three-dots.svg';
	container__editButton.appendChild(editIcon);

	const container__createButtonBubble = document.createElement('div');
	container__createButtonBubble.className = 'container__createButtonBubble';
	
	const pointer = document.createElement('div');
	pointer.className = 'pointer';
	container__createButtonBubble.appendChild(pointer);

	const shareH5 = document.createElement('h5');
	shareH5.textContent = 'Edit';
	container__createButtonBubble.appendChild(shareH5);

	container__editButton.appendChild(container__createButtonBubble);

	const container__sbtContentsMain = document.getElementById('container__mainContents');
	container__sbtContentsMain.appendChild(container__editButton);

	const sbtName = document.getElementById('SBTName');
	sbtName.classList.remove('loading');
	sbtName.textContent = SBTData.name;
	sbtName.classList.add('loaded');


	// Container Right SBT Attributes
	loadSBTAttributes(SBTData);
}



function loadSBTAttributes(SBTData) {
	const container__right = document.getElementById('container__attributes');
	
	let index = 0;
	for (const attribute of SBTData.attributes) {
		if (attribute.trait_type == 'Type' || attribute.trait_type == null) {
			continue;
		}

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

		let encryptedString = "";
		const min = 10;
		const max = 35;
		const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
		for (let i = 0; i < randomInt; i++) {
			encryptedString += "*";
		}

		const descriptionContents = document.createElement('p');
		descriptionContents.textContent = encryptedString;
		descriptionContents.id = index;
		container__description.appendChild(descriptionContents);

		container__attribute.appendChild(container__title);
		container__attribute.appendChild(container__description);
		container__right.appendChild(container__attribute);


		const revealButton = document.createElement('div');
		revealButton.className = 'revealButton';
		revealButton.setAttribute('data-attribute-id', index);
		revealButton.addEventListener('click', revealAttribute);

		const lockIcon = document.createElement("img");
		lockIcon.className = 'lockIcon';
		lockIcon.src = "/images/lock.svg";

		revealButton.appendChild(lockIcon);


		const container__createButtonBubble = document.createElement('div');
		container__createButtonBubble.className = 'container__createButtonBubble';
		
		const pointer = document.createElement('div');
		pointer.className = 'pointer';
		container__createButtonBubble.appendChild(pointer);

		const shareH5 = document.createElement('h5');
		shareH5.textContent = 'Decrypt';
		container__createButtonBubble.appendChild(shareH5);
		revealButton.appendChild(container__createButtonBubble);


		container__description.appendChild(revealButton);
		index++;

	}
}


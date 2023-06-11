function viewAccountSBT(accountSBT) {
	const SBTData = accountSBT.SBTData;
	const container__left = document.getElementById('container__left');
	const container__right = document.getElementById('container__right');

	// Container Left
	const container__image = document.createElement('div');
	container__image.className = 'container__image';

	var ethereumIcon = new Image();
	ethereumIcon.src = '/images/ethereum.svg';
	ethereumIcon.className = 'ethereumIcon';
	container__image.appendChild(ethereumIcon);

	var imageSBT = new Image();
	imageSBT.src = SBTData.image;
	imageSBT.className = 'imageSBT';
	container__image.appendChild(imageSBT);

	container__left.appendChild(container__image);




	// Container Right
	const container__sbtContentsMain = document.createElement('div');
	container__sbtContentsMain.className = 'container__sbtContentsMain';

	const sbtName = document.createElement('h1');
	sbtName.className = 'SBTName';
	sbtName.id = 'SBTName';
	sbtName.textContent = SBTData.name;
	container__sbtContentsMain.appendChild(sbtName);

	const container__SBTType = document.createElement('div');
	container__SBTType.className = 'container__SBTType';

	const type = document.createElement('h5');
	type.className = 'type';
	type.textContent = 'Type:';
	container__SBTType.appendChild(type);

	const sbtType = document.createElement('h5');
	sbtType.className = 'SBTType';
	sbtType.id = 'SBTType';
	sbtType.textContent = SBTData.attributes[0].value;
	container__SBTType.appendChild(sbtType);

	container__sbtContentsMain.appendChild(container__SBTType);

	const container__editButton = document.createElement('div');
	container__editButton.className = 'container__createButton';
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



	const container__burnButton = document.createElement('div');
	container__burnButton.className = 'container__burnButton';
	container__burnButton.addEventListener('click', async () => {
	  const tokenId = accountSBT.tokenId;
	  await burnToken(tokenId);
	});

	var burnIcon = new Image();
	burnIcon.className = 'editIcon';
	burnIcon.src = '/images/openTrash.svg';
	container__burnButton.appendChild(burnIcon);

	const container__burnButtonBubble = document.createElement('div');
	container__burnButtonBubble.className = 'container__createButtonBubble';
	
	const pointerBurn = document.createElement('div');
	pointerBurn.className = 'pointer';
	container__burnButtonBubble.appendChild(pointerBurn);

	const burnH5 = document.createElement('h5');
	burnH5.textContent = 'Burn';
	container__burnButtonBubble.appendChild(burnH5);

	container__burnButton.appendChild(container__burnButtonBubble);

	container__sbtContentsMain.appendChild(container__editButton);
	container__sbtContentsMain.appendChild(container__burnButton);
	container__right.appendChild(container__sbtContentsMain); 

	// Container Right SBT Attributes
	loadSBTAttributes(SBTData);
}



function loadSBTAttributes(SBTData) {
	const container__right = document.getElementById('container__right');
	
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
		revealButton.setAttribute('data-attribute-id', descriptionContents.id);
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


function viewAccountSBT(SBTData) {
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

	const sbtOwner = document.createElement('h5');
	sbtOwner.className = 'SBTOwner';
	sbtOwner.id = 'SBTOwner';
	container__sbtContentsMain.appendChild(sbtOwner);

	const sbtName = document.createElement('h1');
	sbtName.className = 'SBTName';
	sbtName.id = 'SBTName';
	sbtName.textContent = SBTData.name;
	container__sbtContentsMain.appendChild(sbtName);

	const container__SBTType = document.createElement('div');
	container__SBTType.className = 'container__SBTType';

	const type = document.createElement('h5');
	type.className = 'type';
	type.textContent = 'Type';
	container__SBTType.appendChild(type);

	const sbtType = document.createElement('h5');
	sbtType.className = 'SBTType';
	sbtType.id = 'SBTType';
	sbtType.textContent = SBTData.attributes[0].value;
	container__SBTType.appendChild(sbtType);

	container__sbtContentsMain.appendChild(container__SBTType);

	const container__createButton = document.createElement('div');
	container__createButton.className = 'container__createButton';
	container__createButton.id = 'submitButton';

	var sendIcon = new Image();
	sendIcon.className = 'sendIcon';
	sendIcon.src = '/images/share.svg';
	container__createButton.appendChild(sendIcon);

	const container__createButtonBubble = document.createElement('div');
	container__createButtonBubble.className = 'container__createButtonBubble';
	
	const pointer = document.createElement('div');
	pointer.className = 'pointer';
	container__createButtonBubble.appendChild(pointer);

	const shareH5 = document.createElement('h5');
	shareH5.textContent = 'Share';
	container__createButtonBubble.appendChild(shareH5);

	container__createButton.appendChild(container__createButtonBubble)

	container__sbtContentsMain.appendChild(container__createButton);
	container__right.appendChild(container__sbtContentsMain); 

	// Container Right SBT Attributes
	loadSBTAttributes(SBTData);
}



function loadSBTAttributes(SBTData) {
	const container__right = document.getElementById('container__right');
	
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
		descriptionIcon.src = "/images/description.svg";
		const descriptionTitle = document.createElement('h2');
		descriptionTitle.className = 'descriptionTitle';
		descriptionTitle.textContent = attribute.trait_type;
		container__title.appendChild(descriptionIcon);
		container__title.appendChild(descriptionTitle);

		const container__description = document.createElement('div');
		container__description.className = 'container__description-contents';

		const descriptionContents = document.createElement('p');
		descriptionContents.className = 'descriptionContents';
		descriptionContents.textContent = attribute.value;
		container__description.appendChild(descriptionContents);

		container__attribute.appendChild(container__title);
		container__attribute.appendChild(container__description);
		container__right.appendChild(container__attribute);

	}
}
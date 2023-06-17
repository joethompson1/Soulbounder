
function readURL(input) {
	var base64String = "";
	const imageLabel = document.getElementById('imageLabel');

	if (input.files && input.files[0]) {
		const file = input.files[0];
		var reader = new FileReader();

		imageLabel.classList.remove('invalidImage');

		reader.onload = function (e) {
			$('#displayImage').attr('src', e.target.result);
			$('#stockImage').hide();
			$('#displayImage').show();

			base64String = reader.result.split(',')[1];
			$('input.SBTPicture').val(base64String);

		}

		reader.readAsDataURL(input.files[0]);
	}
}



function createCustomAttributes(numberOfCustomInputs) {
	numberOfCustomInputs += 1;
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
	container__description__contents.appendChild(descriptionContents);

	container__attribute.appendChild(container__title);
	container__attribute.appendChild(container__description__contents);

	repeatingInputContainer.appendChild(container__attribute);

}



function closeInput(blankInputBoxX) {
	document.getElementById(blankInputBoxX).remove();
}



function startLoadingAnimation() {
	const headerImg = $(".burgerImg");
	headerImg.css({
	  opacity: "0",
	  pointerEvents: "none"
	});

	const bodyContainer = document.getElementById("container__body");
	bodyContainer.style.opacity = "0";
	bodyContainer.style.pointerEvents = "none";

	// Show the container
	const loadingContainer = document.getElementById("loadingContainer");
	loadingContainer.style.opacity = "1";
}





function revertLoadingAnimation() {
	const headerImg = $(".burgerImg");
	headerImg.css({
	  opacity: "1",
	  pointerEvents: "auto"
	});

	const bodyContainer = document.getElementById("container__body");
	bodyContainer.style.opacity = "1";
	bodyContainer.style.pointerEvents = "auto";

	// Show the container
	const loadingContainer = document.getElementById("loadingContainer");
	loadingContainer.style.opacity = "0";
}




function setLoadingText(currentText) {
  const loadingText = document.getElementById('loadingText');

  // Fade out the current text
  loadingText.style.opacity = 0;

  // Wait for the fade out transition to complete
  setTimeout(() => {
    // Update the text
    loadingText.innerHTML = currentText;

    // Fade in the new text
    loadingText.style.opacity = 1;
  }, 1000); // Wait for 0.5 seconds (the duration of the fade out transition)
}



function handleError(error) {
	document.querySelector('.text__status').innerHTML = error.message;
	document.getElementById('container__statusLight').style.background = "red";
	const element = document.getElementById('text__background');
	const originalColor = element.style.backgroundColor;
	element.style.backgroundColor = 'lightcoral';

	// Set a timeout to revert the background color back to the original after 1 second
	setTimeout(() => {
	  element.style.backgroundColor = originalColor;
	}, 750);

	connectionText = document.getElementById("text__status").innerHTML;
	statusLight = document.getElementById('container__statusLight').style.background;
}




async function setUserWallet() {
	const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	const userWalletAddress = accounts[0];
	localStorage.setItem('userWalletAddress', userWalletAddress);

	return userWalletAddress;
}




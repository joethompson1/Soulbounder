
function readURL(input) {
	var base64String = "";
	if (input.files && input.files[0]) {
		const file = input.files[0];
		var reader = new FileReader();


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
	container__title.appendChild(descriptionTitle);
	
	container__title.innerHTML += `<div class="closeInputButton" id="closeInputButton${numberOfCustomInputs}" onclick="closeInput('customAttribute${numberOfCustomInputs}')">X</div>`;

	const container__description__contents = document.createElement('div');
	container__description__contents.className = 'container__description-contents';

	const descriptionContents = document.createElement('input');
	descriptionContents.className = 'descriptionContents';
	container__description__contents.appendChild(descriptionContents);

	container__attribute.appendChild(container__title);
	container__attribute.appendChild(container__description__contents);

	repeatingInputContainer.appendChild(container__attribute);

}



function closeInput(blankInputBoxX) {
	document.getElementById(blankInputBoxX).remove();
}
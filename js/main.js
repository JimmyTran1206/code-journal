// input event listener to update photo URL
const $inputPhotoURL = document.querySelector('#photoURL');
const $entryImage = document.querySelector('.entry-image');

function photoUpdate(event) {
  const photoURL = event.target.value;
  $entryImage.setAttribute('src', photoURL);
}

$inputPhotoURL.addEventListener('input', photoUpdate);

// submit event listenter for form
const $form = document.querySelector('.form');

function formSave(event) {
  event.preventDefault();
  const formData = {};
  formData[$form.elements.title.name] = $form.elements.title.value;
  formData[$form.elements.photoURL.name] = $form.elements.photoURL.value;
  formData[$form.elements.notes.name] = $form.elements.notes.value;
  formData.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formData);
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
$form.addEventListener('submit', formSave);

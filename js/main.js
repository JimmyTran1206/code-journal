// Issue #1:create an entry

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

// Issue #2: View the entry
function renderEntry(entry) {
  const $liEntry = document.createElement('li');
  $liEntry.className = 'entry';
  $liEntry.setAttribute('data-entry-id', entry.entryId);

  const $divRow = document.createElement('div');
  $divRow.className = 'row';
  $liEntry.append($divRow);

  const $divColumnHalf1 = document.createElement('div');
  $divColumnHalf1.className = 'column-half';
  $divRow.append($divColumnHalf1);

  const $imgViewEntryImage = document.createElement('img');
  $imgViewEntryImage.className = 'view-entry-image';
  $imgViewEntryImage.setAttribute('src', entry.photoURL);
  $imgViewEntryImage.setAttribute('alt', 'Entry Image');
  $divColumnHalf1.append($imgViewEntryImage);

  const $divColumnHalf2 = document.createElement('div');
  $divColumnHalf2.className = 'column-half';
  $divRow.append($divColumnHalf2);

  const $h3EntryTitle = document.createElement('h3');
  $h3EntryTitle.className = 'entry-title';
  $h3EntryTitle.innerText = entry.title;
  $divColumnHalf2.append($h3EntryTitle);

  const $pEntryNotes = document.createElement('p');
  $pEntryNotes.className = 'entry-notes';
  $pEntryNotes.innerText = entry.notes;
  $divColumnHalf2.append($pEntryNotes);

  return $liEntry;
}

const $ulEntryList = document.querySelector('ul.entry-list');
function DOMContentLoadedHandler(event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $liEntry = renderEntry(data.entries[i]);
    $ulEntryList.append($liEntry);
  }
}
document.addEventListener('DOMContentLoaded', DOMContentLoadedHandler);

// function toggleNoEntries(pNoEntry) {
//   pNoEntry.classList.toggle('hidden');
// }

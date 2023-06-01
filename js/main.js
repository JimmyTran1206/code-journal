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
  if (data.editing === null) {
    // Perform standard functionality
    formData[$form.elements.title.name] = $form.elements.title.value;
    formData[$form.elements.photoURL.name] = $form.elements.photoURL.value;
    formData[$form.elements.notes.name] = $form.elements.notes.value;
    formData.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(formData);

    // Reset the form
    $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
    const $deleteButton = document.querySelector('button.delete');
    $deleteButton.classList.add('hidden');

    // Updated functionality of issue#2: view the entires
    const newEntry = renderEntry(formData);
    const $ulEntryList = document.querySelector('ul.entry-list');
    $ulEntryList.prepend(newEntry);
    viewSwap('entries');
    toggleNoEntries('off');
  } else {
    // Updated functionality of issue#3: edit the entry
    // assign the entry id value from data.editing to formData
    formData.entryId = data.editing.entryId;

    // record the new value
    formData[$form.elements.title.name] = $form.elements.title.value;
    formData[$form.elements.photoURL.name] = $form.elements.photoURL.value;
    formData[$form.elements.notes.name] = $form.elements.notes.value;

    // replace the original element in the array with the new one
    for (let indx = 0; indx < data.entries.length; indx++) {
      if (data.entries[indx].entryId === formData.entryId) {
        data.entries.splice(indx, 1, formData);
      }
    }

    // render new dom tree and replace the node
    const $editedEntry = renderEntry(formData);
    const queryString = 'li[data-entry-id=' + '"' + formData.entryId + '"';
    const $originalEntry = document.querySelector(queryString);
    $originalEntry.replaceWith($editedEntry);

    viewSwap('entries');
    toggleNoEntries('off');

    // update the title
    const $h2FormTitle = document.querySelector('h2.form-title');
    $h2FormTitle.innerText = 'New Entry';

    // reset data.editing
    data.editing = null;

    // reset the form
    $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();

    // hide the delete button
    const $deleteButton = document.querySelector('button.delete');
    $deleteButton.classList.add('hidden');
  }

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

  // Issue#3 add the fa-pencil
  const $divRow2 = document.createElement('div');
  $divRow2.className = 'row';
  $divColumnHalf2.append($divRow2);

  const $h3EntryTitle = document.createElement('h3');
  $h3EntryTitle.className = 'entry-title';
  $h3EntryTitle.innerText = entry.title;
  $divRow2.append($h3EntryTitle);

  const $iEditIcon = document.createElement('i');
  $iEditIcon.className = 'fa fa-pencil edit-icon';
  $divRow2.append($iEditIcon);

  const $pEntryNotes = document.createElement('p');
  $pEntryNotes.className = 'entry-notes';
  $pEntryNotes.innerText = entry.notes;
  $divColumnHalf2.append($pEntryNotes);

  return $liEntry;
}

const $ulEntryList = document.querySelector('ul.entry-list');
function domContentLoadedHandler(event) {
  if (data.entries.length === 0) {
    toggleNoEntries('on');
  } else {
    toggleNoEntries('off');
    for (let i = 0; i < data.entries.length; i++) {
      const $liEntry = renderEntry(data.entries[i]);
      $ulEntryList.append($liEntry);
    }
  }
  viewSwap(data.view);
}
document.addEventListener('DOMContentLoaded', domContentLoadedHandler);

function toggleNoEntries(state) {
  const $pNoEntry = document.querySelector('p.no-entry');
  if (state === 'on') {
    $pNoEntry.classList.remove('hidden');
  }
  if (state === 'off') {
    $pNoEntry.classList.add('hidden');
  }
}

function viewSwap(viewMode) {
  data.view = viewMode;
  const $entryFormView = document.querySelector('div[data-view="entry-form"]');
  const $entriesView = document.querySelector('div[data-view="entries"]');
  if (viewMode === 'entries') {
    $entryFormView.classList.add('hidden');
    $entriesView.classList.remove('hidden');
  }
  if (viewMode === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');
  }
}

const $entriesLink = document.querySelector('a.entries-link');

$entriesLink.addEventListener('click', () => {
  viewSwap('entries');
});

const $newLink = document.querySelector('a.button-new');
$newLink.addEventListener('click', () => {
  viewSwap('entry-form');

  // hide the delete button
  const $deleteButton = document.querySelector('button.delete');
  $deleteButton.classList.add('hidden');

  // reset the form
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

// Issue #3: edit an entry
function editEntriesHandler(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  viewSwap('entry-form');
  // find the edit entry
  const $currentEntry = event.target.closest('li');
  let currentId = $currentEntry.getAttribute('data-entry-id');
  currentId = parseInt(currentId);
  const currentEntryObject = {};
  for (const entry of data.entries) {
    if (entry.entryId === currentId) {
      const { entryId, notes, photoURL, title } = entry;
      currentEntryObject.entryId = entryId;
      currentEntryObject.notes = notes;
      currentEntryObject.photoURL = photoURL;
      currentEntryObject.title = title;
    }
  }
  // assign the edit entry to the data.editing
  data.editing = currentEntryObject;

  // pre-populate the form
  const $form = document.querySelector('.form');
  $form.elements.title.value = currentEntryObject.title;
  $form.elements.photoURL.value = currentEntryObject.photoURL;
  $form.elements.notes.value = currentEntryObject.notes;
  // update image since assignment operator does not count as an 'input' event
  const $entryImage = document.querySelector('.entry-image');
  $entryImage.setAttribute('src', currentEntryObject.photoURL);

  // update the title of the entry-form
  const $h2FormTitle = document.querySelector('h2.form-title');
  $h2FormTitle.innerText = 'Edit Entry';

  // Issue#4: show the delete button
  const $deleteButton = document.querySelector('button.delete');
  $deleteButton.classList.remove('hidden');

}
$ulEntryList.addEventListener('click', editEntriesHandler);

// Issue#4 the delete button functionality
const $deleteButton = document.querySelector('button.delete');

$deleteButton.addEventListener('click', deleteButtonHandler);

function deleteButtonHandler(event) {
  event.preventDefault();
  toggleModal('on');
  const $cancelButton = document.querySelector('button.button-cancel');
  $cancelButton.addEventListener('click', () => {
    event.preventDefault();
    toggleModal('off');
  });
  const $confirmButton = document.querySelector('button.button-confirm');
  $confirmButton.addEventListener('click', () => {
    const currentId = data.editing.entryId;
    deleteEntry(currentId);
  });

}

function toggleModal(state) {
  const $articleOverlay = document.querySelector('article.overlay');
  if (state === 'on') {
    $articleOverlay.classList.remove('hidden');
  }
  if (state === 'off') {
    $articleOverlay.classList.add('hidden');
  }
}

function deleteEntry(Id) {
  // find and delete the object with the same id in data.entries
  for (let indx = 0; indx < data.entries.length; indx++) {
    if (data.entries[indx].entryId === Id) {
      data.entries.splice(indx, 1);
    }
  }
  // find and remove the li-element from the dom-tree
  const queryString = 'li[data-entry-id=' + '"' + Id + '"';
  const $currentLI = document.querySelector(queryString);
  $currentLI.remove();

  // toggle NoEntry text in case of no entry
  if (data.entries.length === 0) {
    toggleNoEntries('on');
  }

  // hide the modal
  toggleModal('off');
  // swap to entries-view
  viewSwap('entries');
  // clear data-editing
  data.editing = null;
}

/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function dataSave(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
}
window.addEventListener('beforeunload', dataSave);

const previousData = localStorage.getItem('data-local-storage');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

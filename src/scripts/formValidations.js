function clearAllTrigger() {
  const noteTitle = document.getElementById('noteTitle');
  const noteBody = document.getElementById('noteBody');
  noteTitle.classList.remove('passed');
  noteBody.classList.remove('passed');
}

function clearBodyWarning(time) {
  const noteBody = document.getElementById('noteBody');
  const descBodyValidation = document.getElementById('bodyValidation');
  setTimeout(() => {
    descBodyValidation.classList.add('hidden');
    noteBody.classList.remove('warning');
  }, time);
}

function clearTitleWarning(time) {
  const noteTitle = document.getElementById('noteTitle');
  const descTitleValidation = document.getElementById('titleValidation');
  setTimeout(() => {
    descTitleValidation.classList.add('hidden');
    noteTitle.classList.remove('warning');
  }, time);
}

function addTitleWarning() {
  const noteTitle = document.getElementById('noteTitle');
  const descTitleValidation = document.getElementById('titleValidation');
  descTitleValidation.classList.remove('hidden');
  noteTitle.classList.add('warning');
}

function addBodyWarning() {
  const noteBody = document.getElementById('noteBody');
  const descBodyValidation = document.getElementById('bodyValidation');
  descBodyValidation.classList.remove('hidden');
  noteBody.classList.add('warning');
}

export {
  clearBodyWarning,
  clearTitleWarning,
  addBodyWarning,
  addTitleWarning,
  clearAllTrigger,
};

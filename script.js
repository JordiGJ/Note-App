// get elements

const noteContainer = document.querySelector("section");
const btn = document.querySelector(".add-button");

//variables

let ids = 0;
let notes = [];

//  functions

// clear localStorage
function clearLocalStorageData() {
  localStorage.removeItem("notes");
  localStorage.removeItem("ids");
}

// send info to localStorage
function setLocalStorageData() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("ids", ids);
}

// create add button, its content and its eventListener
function createAddButton() {
  const button = document.createElement("button");
  button.classList.add("add-button");
  button.textContent = "+";
  noteContainer.append(button);
  button.addEventListener("click", handleClick);
}

// create remove all button, its content and its eventListener
function createRemoveButton() {
  const button = document.createElement("button");
  button.classList.add("remove-button");
  button.textContent = "Remove all notes";
  noteContainer.append(button);
  button.addEventListener("click", handleRemoveAll);
}

// // adding a note
function handleClick() {
  notes.push({ id: ids, text: "" });
  ids++;
  setLocalStorageData();
  renderNotes();
}

handleDclick;
function handleDclick(n) {
  const warning = confirm("Do you want to delete this note?");
  if (warning) {
    const filteredNotes = notes.filter((note) => note.id !== n.id);
    notes = filteredNotes;
    setLocalStorageData();
    renderNotes();
  }
}

// removing all notes
function handleRemoveAll() {
  const warning = confirm("Remove all notes?");
  if (warning) {
    clearLocalStorageData();
    noteContainer.innerHTML = "";
    createAddButton();
    // reset variables
    notes = [];
    ids = 0;
  }
}

// render notes
function renderNotes() {
  // remove elements in noteContainer
  noteContainer.innerHTML = "";
  // update notes and ids from localStorage
  notes = JSON.parse(localStorage.getItem("notes"));
  ids = +localStorage.getItem("ids");
  // create and append notes from notes and eventListener
  notes.forEach((n, index) => {
    const note = document.createElement("div");
    note.classList.add("note");
    const tArea = document.createElement("textarea");
    tArea.placeholder = "Empty Note";
    note.append(tArea);
    noteContainer.append(note);
    tArea.value = n.text;
    // store note text into localStorage when typing
    tArea.addEventListener("input", () => {
      n.text = tArea.value;
      setLocalStorageData();
    });
    // add dclick listener to each note
    note.addEventListener("dblclick", () => handleDclick(n));
  });
  // if there's more than one note remove button is rendered
  notes.length > 1 && createRemoveButton();
  createAddButton();
}

function init() {
  localStorage.getItem("notes") && renderNotes();
}

// event listeners
btn.addEventListener("click", handleClick);

// init
init();

// 


const addTodoBtn = document.querySelector("#app-todoAddBtn");
const list = document.querySelector("#app-todoUL");
const modal = document.querySelector("#modal");
const modalWindow = document.querySelector("#modal-window");
const modalInput = document.querySelector("#modal-input")
const modalAddBtn = document.querySelector("#modal-addBtn");
const modalCloseBtn = document.querySelector("#modal-closeBtn");
let myTodos = [];

// Checks if local storage exists and restores previous todos
function recoverTodos() {
    if (localStorage.getItem('todos')) {
        myTodos = JSON.parse(localStorage.getItem('todos'));
        for (let todo of myTodos) {
            let todoEl = generateLI(todo);
            list.appendChild(todoEl);
        }
    }
}

function addNewTodo(evt) {
    evt.preventDefault();
    if (modalInput.value) {
        const newTodo = generateLI(modalInput.value);
        list.appendChild(newTodo);
        myTodos.push(newTodo.innerText.substring(0, newTodo.innerText.length - 2));
        modalInput.value = '';
        toggleTodoModal();
        saveToLocalStorage();
    } else {
        alert('Please provide valid input');
    }
}

// Create the HTML elements required
function generateLI(todo) {
    const liElement = document.createElement("li");
    liElement.innerText = todo;
    const trashBtn = document.createElement("span");
    trashBtn.innerText = " X";
    trashBtn.classList.add("app-trashBtn")
    liElement.appendChild(trashBtn);
    return liElement;
}

function handleClickOnUL(evt) {
    evt.target.classList.toggle("completed"); // Marked Complete
    if (evt.target.classList.contains("app-trashBtn")) { // Delete Todo
        evt.target.parentElement.remove();
        myTodos = myTodos.filter(todo => todo !== evt.target.parentElement.innerText.substring(0, evt.target.parentElement.innerText.length - 2));
        saveToLocalStorage();
    }
}

function toggleTodoModal() {
    modal.classList.toggle('hidden');
}

function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(myTodos));
}

// Event Listeners
recoverTodos(); // On startup check for local storage
list.addEventListener('click', handleClickOnUL);
addTodoBtn.addEventListener('click', toggleTodoModal); // Modal Popup
modalAddBtn.addEventListener('click', addNewTodo);
modalCloseBtn.addEventListener('click', (evt) => { // Modal Close
    evt.preventDefault();
    toggleTodoModal();
});


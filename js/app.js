///DOM Selectors
const listContainer = document.querySelector("#todo-list");


//global variables
let todoList = [];


//eventListeners
document.querySelector("#main-btn").addEventListener("click", addTodo);

document.addEventListener("DOMContentLoaded", () => {
  todoList = JSON.parse(localStorage.getItem("toDos")) || [];
  writeHTML();
});


//functions
function addTodo(e) {
  e.preventDefault();
  const todoText = document.querySelector("input#todo").value;
  if (todoText) {
    todoList = [...todoList, { id: Date.now(), todo: todoText }];
    writeHTML(todoList);
    syncStorage();
    document.querySelector("#main-form").reset();
    console.log(todoList);
  } else {
    return;
  }
}

function writeHTML() {
  clearHTML();
  todoList.forEach(element => {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("a");
    deleteBtn.classList.add("delete-todo");
    deleteBtn.textContent = "x";

    deleteBtn.onclick = () => {
      deleteToDo(element.id);
    }
    li.textContent = element.todo;
    li.appendChild(deleteBtn);
    document.querySelector("#todo-list").appendChild(li);
  });
}

function clearHTML() {
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.children[0]);
  }
}

//add data to localStorage
function syncStorage() {
  localStorage.setItem('toDos', JSON.stringify(todoList));
}

function deleteToDo(id) {
  todoList = todoList.filter(toDo => toDo.id !== id);
  writeHTML();
  localStorage.clear();
  syncStorage();
}
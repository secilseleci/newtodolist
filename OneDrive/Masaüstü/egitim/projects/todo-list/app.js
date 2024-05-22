//tüm elementleri seçme
const firstCardBody = document.querySelector(".card-body1");
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");

const secondCardBody = document.querySelector(".card-body2");
const filterInput = document.querySelector("#todoSearch");
const todoList = document.querySelector(".list-group");
const clearButton = document.querySelector("#clearButton");
let todos = [];

//Bütün eventler
runEvents();
function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoFromUI);
  clearButton.addEventListener("click", clearAllTodos);
  filterInput.addEventListener("keyup", filterTodos);
}

//storageda kayıtlı verileri arayüze yazdırma
function pageLoaded() {
  checkTodoFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
function addTodo(e) {
  e.preventDefault();
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    showAlert("warning", "Please, add a value!");
  } else {
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    addInput.value = "";
    showAlert("success", "Adding successful!");
  }
}
//arayüze to do ekleme
function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);
}
//Arayüzden to do silme
function removeTodoFromUI(e) {
  if (e.target.className == "fa fa-remove") {
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    showAlert("success", "Todo deleted successfuly.");

    //Storagedan to do silme
    removeTodoFromstorage(todo.textContent);
  }
}
//storagea to do ekleme
function addTodoToStorage(newTodo) {
  checkTodoFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
//Storagedan to do silme
function removeTodoFromstorage(removeTodo) {
  checkTodoFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo == todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
//storage kontrolü
function checkTodoFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}
//bilgilendirme mesajı
function showAlert(type, message) {
  const div = document.createElement("div");
  div.className = "alert alert-" + type;
  div.textContent = message;
  firstCardBody.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 2500);
}
//clear butonu
function clearAllTodos() {
  const allTodos = document.querySelectorAll(".list-group-item");

  if (allTodos.length > 0) {
    allTodos.forEach(function (todo) {
      todo.remove();
    });
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    showAlert("success", "Your list is clean.");
  } else {
    showAlert("warning", "Your list is already clean.");
  }
}
//filtreleme fonksiyonu
function filterTodos(e) {
  const value = e.target.value.toLowerCase().trim();
  const todoList = document.querySelectorAll(".list-group-item");
  console.log(todoList);
  if (todoList.length > 0) {
    todoList.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(value)) {
        todo.setAttribute("style", "display: block");
      } else {
        todo.setAttribute("style", "display: none !important");
      }
    });
  } else {
    showAlert("warning", "Please add a value");
  }
}

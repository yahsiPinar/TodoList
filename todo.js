// All elements are selected and assigned to variables

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList= document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton= document.querySelector("#clear-todos");

eventListeners();

// All event listeners
function eventListeners(){
    form.addEventListener("submit", addToDo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

}
function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinize emin misiniz? ")){
        //todoList.innerHTML = ""; //First way to clear from UI
        // Another way to clear from UI
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        //Delete from storage
        localStorage.removeItem("todos");
    }
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems =  document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    });
}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        // process must reach to the parent element before. fa fa-remove-> a -> li
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        
        showAlert("success", "Todo başarıyla silindi...");
         
    }

}
// func deletes todo from the storage
function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();
    
    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1);
        }
    });
    // after delete operation, update the storage
    localStorage.setItem("todos", JSON.stringify(todos));
}
// func manages todo adding operations
function addToDo(e){
    const newTodo= todoInput.value.trim(); // trim func ignores the white spaces at the begining and end of the word.
    if(newTodo===""){ 
        showAlert("danger", "lütfen bir to do girin!");
    }
   else{
        addTodoToUI(newTodo); 
        addTodoToStorage(newTodo); 
        showAlert("success", "To do başarılı ile eklendi");
    }
    e.preventDefault(); 
}
// Func creates an allert according to given type and warning message
function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent= message;
    console.log(alert);
    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },1000);
}
// func adds the new todo value to the UI
function addTodoToUI(newTodo){
    // Create list item
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    // Create link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    // Adding a text and a node to the <li> component
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    // Adding the item to the todoList
    todoList.appendChild(listItem);
    // After the adding operation, clean the item UI
    todoInput.value = "";

}
// func gets the todos from storage
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos= [];
    }
    else{
        // values are written the storage as a string. To get values from the storage, firstly convert to the array
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
// func adds the new item to the local storage
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}
// func add the recorded todos to UI, when the page is loaded
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo) {
        addTodoToUI(todo);
    })
}
// func deletes todos

const todoForm = document.querySelector(".jsTodoForm"),
    toDoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".jsTodoList");

let toDos = [];

const TODOS_LS = 'toDos';

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text){
    if(text !== ""){
        // li 생성
        const li = document.createElement("li");
        // button 생성
        const delBtn = document.createElement("button");
        delBtn.innerText = "❌";
        delBtn.style.backgroundColor="rgba(0, 0, 0, 0)";
        delBtn.style.border="0";
        delBtn.addEventListener("click", deleteToDo);
        // span 생성
        const span = document.createElement("span");
        span.innerText = text;
        
        const newId = toDos.length + 1;

        // li에 button, span 넣기
        li.appendChild(span);
        li.appendChild(delBtn);
        
        // li마다 id 넣기
        li.id = newId;

        // ul에 li 넣기
        todoList.appendChild(li);

        const toDoObj = {
            text: text,
            id: newId
        }
        toDos.push(toDoObj);

        saveToDos();
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
}

function loadTodos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintTodo(toDo.text);
        })
    }
}

function init() {
    loadTodos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();
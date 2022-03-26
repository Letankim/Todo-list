var input = document.querySelector('.cart__add-input');
var btnAdd = document.querySelector('.btn');
var listTodo = document.querySelector('.cart__todo-list');
var isError = false;
// add todo 
function addToDo() {
    btnAdd.addEventListener('click', function(e) {
        let val = input.value.trim();
        if(val) {
        // check todo list has existed? if existed change isError = true;
            isError = checkValueTodo(val);
            var timeTodo = new Date().toLocaleString();
            if(!isError) {
                showToDoList({
                    text: val,
                    time: timeTodo
                });
            };
            saveToDoList();
        };
        input.value = '';
    });
    input.addEventListener('keydown', function(e) {
        if(e.keyCode === 13) {
            let val = input.value.trim();
            if(val) {
        // check todo list has existed? if existed change isError = true;
                isError = checkValueTodo(val);
                var timeTodo = new Date().toLocaleString();
                if(!isError) {
                    showToDoList({
                        text: val,
                        time: timeTodo
                    });
                };
                saveToDoList();
            };
            input.value = '';
        };
    });
};
// show todo new
function showToDoList(todo) {
    var li = document.createElement('li');
    li.innerHTML = `
    <div class="infor-todo">
        <span class="todo-value">${todo.text}</span>
        <span class="todo-time">${todo.time}</span>
    </div>
    <i class="cart__todo-remove fas fa-trash"></i>
    `
    if(todo.status === 'completed') {
        li.setAttribute('class', 'completed');
    };
    // add todo list has completed 
    li.addEventListener('click', function(e) {
        this.classList.toggle('completed');
        saveToDoList();
    });
    // remove todo list
    li.querySelector('i').addEventListener('click', function(e) {
        this.parentElement.remove();
        saveToDoList();
    });
    listTodo.appendChild(li);
};
addToDo();
showOldTodo();
saveToDoList();
// save todo list
function saveToDoList() {
    let eles = document.querySelectorAll('li');
    var todoLists = [];
    eles.forEach(function(item) {
        let value = item.querySelector('span').innerText;
        let time = item.querySelector('.todo-time').innerText;
        let status = item.getAttribute('class');
        todoLists.push({ 
            text: value, 
            status: status,
            time: time
        });
    });
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
};

// show all toto list saved
function showOldTodo() {
    var showValue = JSON.parse(localStorage.getItem("todoLists"));
    showValue.forEach(function(todo) {
        showToDoList(todo);
    });
};
// check todo list has existed
function checkValueTodo(valueNew) {
    var showValue = JSON.parse(localStorage.getItem("todoLists"));
    console.log(showValue);
    function check_arr(newValue,arrTodo){
        let isExist = false;
        for (let i = 0; i < arrTodo.length; i ++){
            if (arrTodo[i].text.includes(newValue))  {
                isExist = true;
                break
            };
        };
        return (isExist) ? true : false;
    };
    var isError = check_arr(valueNew, showValue);
    if(isError) {
        alert('To-do list already exists in the database.');
         return true;
    };
};
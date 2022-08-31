const buttonAddTask = document.querySelector('.btn');
const inputMessage = document.querySelector('.input');
const taskList = document.querySelector('.task-list');

let arrayTask = [];
let todoItemElem = [];

if (localStorage.getItem('array')) {
    arrayTask = JSON.parse(localStorage.getItem('array'));
    displayMessage();
}

buttonAddTask.addEventListener('click', () => {
    if (inputMessage.value === 0) return;
    createTask();
    displayMessage();
    if (inputMessage.value) {
        inputMessage.value = '';
    }
})

function createTask() {
    let task = {
        descriprion: inputMessage.value,
        checked: false,
    }
    arrayTask.push(task);
    localStorage.setItem('array', JSON.stringify(arrayTask));
}

function filtredTask() {
    const activeTask = arrayTask.length && arrayTask.filter(item => item.checked == false);
    const completedTask = arrayTask.length && arrayTask.filter(item => item.checked == true);
    arrayTask = [...activeTask, ...completedTask];
}

function displayMessage() {
    let displayMessage = '';
    if (arrayTask.length === 0) { taskList.innerHTML = '' }
    filtredTask();
    arrayTask.forEach((item, index) => {
        displayMessage += `
        <li class="todo-item ${item.checked ? 'dark' : ''}">
        <input onclick = checkedTask(${index}) type="checkbox" id="${index}" class="checked" ${item.checked ? 'checked' : ''}>
        <span class="span">${item.descriprion}</span>
        <button class="btn_${index}">Удалить задачу</button>
        </li>
        `;
        taskList.innerHTML = displayMessage;
        todoItemElem = document.querySelectorAll('.todo-item');
    });
}


taskList.addEventListener('click', (event) => {
    if (event.target.innerText === "Удалить задачу") {
        deleteTask(event.target.className);
        displayMessage();
        localStorage.setItem('array', JSON.stringify(arrayTask));
    }
});


function deleteTask(taskClass) {
    let index = Number(taskClass.slice(4));
    arrayTask.splice(index, 1);
    displayMessage();
};


function checkedTask(index) {
    arrayTask[index].checked = !arrayTask[index].checked;
    if (arrayTask[index].checked) {
        todoItemElem[index].classList.add('dark');
    } else {
        todoItemElem[index].classList.remove('dark');
    }
    localStorage.setItem('array', JSON.stringify(arrayTask));
    displayMessage();
}

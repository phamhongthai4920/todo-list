var input = document.querySelector('.search')
var button = document.querySelector('.add-todo button')
var todoList = document.querySelector('.todo-list')
var form = document.querySelector('form')
var workNumb = document.querySelector('.work-numb')
var delAll = document.querySelector('.del-all')
var numbCompleted = document.querySelector('.numb-completed span')
function start() {
    init()
    deleteAllTodo()
    handleSubmitForm()
}
start()

function init() {
    var todos = JSON.parse(localStorage.getItem('todos'))
    if (todos) {
        todos.forEach((todo) => addTodo(todo))
    }
}

function deleteAllTodo() {
    delAll.addEventListener('click', (e) => {
        const listTodo = document.querySelectorAll('li')
        listTodo.forEach(e => e.remove());
        updateTodo()
    }
    )
}
function showNumbTodo() {
    const listTodo = document.querySelectorAll('li')
    listTodo.length != 0 ? workNumb.innerText = listTodo.length : workNumb.innerText = '0'

}

function showNumbCompleted() {
    const listCompleted = document.querySelectorAll('.completed')
    listCompleted.length ? numbCompleted.innerText = listCompleted.length : numbCompleted.innerText = '0'
}
function handleSubmitForm() {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let text = input.value.trim()
        text !== '' ? addTodo({ text, completed: false }) : undefined
        input.value = '';
    })
}



function addTodo(todo) {
    const li = document.createElement('li')
    li.setAttribute('class', todo.completed ? 'completed' : '')
    li.innerHTML = `<span class="text">${todo.text}</span >
        <span class="remove">
            <i class="fa-regular fa-trash-can"></i>
        </span>`
    li.addEventListener('click', function (e) {
        this.classList.toggle('completed')
        updateTodo()
    })
    li.querySelector('.remove').addEventListener('click', function (e) {
        this.parentElement.remove()
        updateTodo()
    })
    todoList.appendChild(li)
    updateTodo()
}
function updateTodo() {
    const listTodo = document.querySelectorAll('li')
    const listTodoArr = [...listTodo]
    const todos = listTodoArr.map(item => {
        return {
            text: item.querySelector('.text').innerHTML,
            completed: item.classList.contains('completed')
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    showNumbTodo()
    showNumbCompleted()

}



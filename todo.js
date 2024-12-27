const todoListElement = document.getElementById('todoList');
const addButton = document.getElementById('addTodo');
const todoInput = document.getElementById('todoInput');

function addTodo(text, checked = false) {
    
    const li = document.createElement('li');
    li.classList.add(
        'list-group-item',
        'd-flex',
        'align-items-center',
        'justify-content-between'
    );

    //텍스트 추가
    const spanElement = document.createElement('span');
    spanElement.classList.add('ms-2', 'flex-grow-1');
    spanElement.textContent = text;

    li.append(spanElement);
    todoListElement.appendChild(li);
}
    addButton.addEventListener('click', () => {
        if (todoInput.value.trim() === '') return;

        addTodo(todoInput.value);
    });



const todoListElement = document.getElementById('todoList');
const addButton = document.getElementById('addTodo');
const todoInput = document.getElementById('todoInput');

function addTodo(text, checked = false) {
    
   
    //텍스트 추가
    const spanElement = document.createElement('span');
    spanElement.classList.add('ms-2', 'flex-grow-1');
    spanElement.textContent = text;

    li.append(spanElement);
 
}
   



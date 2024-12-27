function addTodo(text, checked = false) {

    //li 요소 만들기
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between");


    // 삭제 버튼 추가
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
        // localStorage 업데이트
        const todos = loadTodos();
        const index = Array.from(li.parentElement.children).indexOf(li);
        todos.splice(index, 1);
        saveTodos(todos);
        // 요소 삭제
        li.remove();
    });

    li.prepend(checkbox);
    li.append(spanElement);
    li.append(deleteButton);
    todoListElement.append(li);

}
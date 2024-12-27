// DOM 요소들을 미리 저장
const todoListElement = document.getElementById("todoList");
const addButton = document.getElementById("addTodo");
const todoInput = document.getElementById("todoInput");

function addTodo(text, checked = false) {
    // li 요소 만들기
    const li = document.createElement("li");
    li.classList.add(
        "list-group-item",
        "d-flex",
        "align-items-center",
        "justify-content-between"
    );

    // 체크박스 만들기
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input");
    checkbox.checked = checked;

    // 텍스트 추가
    const spanElement = document.createElement("span");
    spanElement.classList.add("ms-2", "flex-grow-1");
    spanElement.textContent = text;

    // 체크박스 상태에 따라 취소선 처리
    spanElement.style.textDecoration = checked ? "line-through" : "none";

    // 체크박스 클릭시 처리
    checkbox.addEventListener("change", () => {
        spanElement.style.textDecoration = checkbox.checked ? "line-through" : "none";

        // localStorage 업데이트
        const todos = loadTodos();
        const index = Array.from(li.parentElement.children).indexOf(li);
        todos[index].checked = checkbox.checked;
        saveTodos(todos);
    });

    // 삭제 버튼 추가
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
        const todos = loadTodos();
        const index = Array.from(li.parentElement.children).indexOf(li);
        todos.splice(index, 1);
        saveTodos(todos);
        li.remove();
    });

    // 수정 버튼 추가
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-warning", "btn-sm", "ms-2");
    editButton.textContent = "수정";

    // 수정 버튼 동작
    editButton.addEventListener("click", () => {
        // 이미 수정 모드인지 확인
        if (li.querySelector(".edit-input")) return; 

        //수정필드 추가
        const currentText = spanElement.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.classList.add("form-control", "edit-input", "ms-2");

        const saveButton = document.createElement("button");
        saveButton.classList.add("btn", "btn-success", "btn-sm", "ms-2");
        saveButton.textContent = "저장";

        saveButton.addEventListener("click", () => {
            const newText = input.value.trim();
            if (newText) {
                // 텍스트 업데이트
                spanElement.textContent = newText;
                spanElement.style.display = "inline";
                // 수정 필드 제거
                input.remove();
                saveButton.remove();

                // localStorage 업데이트
                const todos = loadTodos();
                const index = Array.from(li.parentElement.children).indexOf(li);
                todos[index].text = newText;
                saveTodos(todos);
            }
        });

        spanElement.style.display = "none"; // 기존 텍스트 숨기기
        li.insertBefore(input, deleteButton); // 수정 필드 추가
        li.insertBefore(saveButton, deleteButton); // 저장 버튼 추가
    });

    li.prepend(checkbox);
    li.append(spanElement);
    li.append(editButton);
    li.append(deleteButton);
    todoListElement.append(li);
}


// localStorage에서 할일 목록 가져오기
function loadTodos() {
    const savedTodos = localStorage.getItem("todoList");
    return savedTodos ? JSON.parse(savedTodos) : [];
}

// localStorage에 할일 목록 저장하기
function saveTodos(todos) {
    localStorage.setItem("todoList", JSON.stringify(todos));
}

// 초기화 함수
function initialize() {
    // 저장된 할일 목록 불러오기
    const todos = loadTodos();
    todos.forEach((todo) => {
        addTodo(todo.text, todo.checked);
    });

    // 새로운 할일 추가 버튼 클릭 이벤트
    addButton.addEventListener("click", () => {
        if (todoInput.value.trim() === ""){ 
            alert("내용을 입력하세요.")
            return; // 빈 입력 방지
        }


        // 새로운 할일 추가
        addTodo(todoInput.value);

        // localStorage 업데이트
        const todos = loadTodos();
        const todoData = {
            text: todoInput.value,
            checked: false,
        };
        todos.push(todoData);
        saveTodos(todos);

        // 입력창 비우기
        todoInput.value = "";
    });
}

// 페이지 로드시 초기화
document.addEventListener("DOMContentLoaded", initialize);
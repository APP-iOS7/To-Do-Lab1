// DOM 요소들을 미리 저장
const todoListElement = document.getElementById("todoList");
const addButton = document.getElementById("addTodo");
const todoInput = document.getElementById("todoInput");

function addTodo(text, checked = false) {
    //li 요소 만들기!
    const li = document.createElement("li");
    li.classList.add(
        "list-group-item",
        "d-flex",
        "align-items-center",
        "justify-content-between"
    );

    //체크박스 만들기
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox, classList.add("form-check-input");
    // checkbox 요소 checked 프로퍼티에 checked 파라미터값 (true/false) 할당
    checkbox.checked = checked;

    //텍스트 추가
    const spanElement = document.createElement("span");
    spanElement.classList.add("ms-2", "flex-grow-1");
    spanElement.textContent = text;

    //체크박스 체크시 텍스트에 줄긋기 이미 완료 한것을 의미
    spanElement.style.textDecoration = checked ? "line-through" : "none";

    //체크박스 클릭시 ㅍ처리
    checkbox.addEventListener("change", () => {
        spanElement.style.textDecoration = checkbox.checked ? "line-through" : "none";

           // localStorage 업데이트
           const todos = loadTodos();
           const index = Array.from(li.parentElement.children).indexOf(li);
           todos[index].checked = checkbox.checked;
           saveTodos(todos);
    });

    li.append(spanElement);
    li.append(checkbox);
    todoListElement.append(li);

    // localStorage에 할일 목록 가져오기
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
    };

    // 새로운 할일 추가 버튼 클릭 이벤트
    addButton.addEventListener("click", () => {
        if (todoInput.value.trim() === "") return; // 빈 입력 방지

        // 새로운 할일 추가
        addTodo(todoInput.value);

        // 입력창 비우기
        todoInput.value = "";
    });
}

// 페이지 로드시 초기화
document.addEventListener("DOMContentLoaded", initialize);

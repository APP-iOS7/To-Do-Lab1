// DOM 요소들을 미리 저장
const todoListElement = document.getElementById("todoList");
const addButton = document.getElementById("addTodo");
const todoInput = document.getElementById("todoInput");

function addTodo(text) {
  };

// 초기화 함수
function initialize() {
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
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
    // checkbox 요소 checked 프로퍼티에 checked 파라미터의 값 (true/false) 할당
    checkbox.checked = checked;

    // 텍스트 추가
    const spanElement = document.createElement("span");
    spanElement.classList.add("ms-2", "flex-grow-1");
    spanElement.textContent = text;

    // 체크박스 상태에 따라 취소선 처리
    spanElement.style.textDecoration = checked ? "line-through" : "none";

    // 체크박스 클릭시 처리
    // 체크박스의 값이 변경되면, 여기서 정의한 함수가 실행됨 (지연 실행)
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
        // localStorage 업데이트
        const todos = loadTodos();
        const index = Array.from(li.parentElement.children).indexOf(li);
        todos.splice(index, 1);
        saveTodos(todos);
        // 요소 삭제
        li.remove();
    });

        // // 수정 버튼 추가
        // const updateButton = document.createElement("button");
        // updateButton.classList.add("btn", "btn-info", "btn-sm", "ms-2");
        // updateButton.textContent = "수정";
        // updateButton.addEventListener("click", () => {
        //     // localStorage 업데이트
        //     const todos = loadTodos();
        //     const index = Array.from(li.parentElement.children).indexOf(li);
        //     todos.splice(index, 1);
        //     saveTodos(todos);
        //     // 요소 삭제
        //     li.remove();
        // });
    
        // 수정 버튼 추가
const editButton = document.createElement("button");
editButton.classList.add("btn", "btn-warning", "btn-sm", "ms-2");
editButton.textContent = "수정";
editButton.addEventListener("click", () => {
  // 수정할 항목의 텍스트를 가져오기
  // const currentText = li.textContent.replace("수정 삭제", "").trim();  // '수정 삭제' 텍스트 제외
  const currentText = li.firstChild.textContent.trim();  // 첫 번째 자식의 텍스트 (버튼 제외)

  // 모달 창 생성
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'exampleModalLabel');
  modal.setAttribute('aria-hidden', 'true');

  // 모달 콘텐츠
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">할 일 수정</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="text" class="form-control" id="todoInput" value="${currentText}" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
          <button type="button" class="btn btn-primary" id="saveButton">저장</button>
        </div>
      </div>
    </div>
  `;
  
  // body에 모달 추가
  document.body.appendChild(modal);
  
  // 모달 창 활성화
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();

  // 저장 버튼 클릭 시 수정 완료
  const saveButton = modal.querySelector('#saveButton');
  saveButton.addEventListener('click', () => {
    const updatedText = modal.querySelector('#todoInput').value;
    
    // localStorage 업데이트
    const todos = loadTodos();
    const index = Array.from(li.parentElement.children).indexOf(li);
    todos[index].text = updatedText;
    saveTodos(todos);


        // // li 항목의 기존 텍스트 삭제
        // li.innerHTML = '';  // 기존 텍스트와 버튼 모두 제거

        // // 새로운 텍스트로 업데이트
        // li.textContent = updatedText; // 새로운 텍스트만 추가


    // 모달 닫기
    bootstrapModal.hide();
    modal.remove();
    todoList.style.display = "none";
    initialize();
  });
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
        if (todoInput.value.trim() === "") return; // 빈 입력 방지

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

    todoList.style.display = "block";  // 목록을 다시 표시

}

// 페이지 로드시 초기화
document.addEventListener("DOMContentLoaded", initialize);
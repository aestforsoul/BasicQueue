const inputValue = document.querySelector(".task-input");
const taskQueue = document.querySelector(".queue");
const addBtn = document.querySelector(".add-button");
const removeBtn = document.querySelector(".remove-button");
const limit = 21;

let queue = [];

const removeTask = () => {
  if (queue.length === 0) {
    alert("You do not have any tasks.");
  } else {
    queue.shift();
    taskQueue.removeChild(taskQueue.firstChild);
  }
  localStorage.setItem("tasks", JSON.stringify(queue));
};

const addToDOM = (value) => {
  let newElement = document.createElement("div");
  newElement.classList.add(".queue__item");
  newElement.textContent = value;
  taskQueue.append(newElement);
};

const isLimited = () => {
  if (queue.length >= limit) {
    alert(
      `You can not add more tasks. Limit is ${limit}. You can remove and then add new task.`
    );
    return true;
  }
  return false;
};

const isEmpty = (value) => {
  if (value === "") {
    alert("You can not add empty task to queue. Please, write some text.");
    return true;
  }
  return false;
};

const addTask = () => {
  const task = inputValue.value.trim();
  if (isEmpty(task) || isLimited()) {
    return;
  } else {
    addToDOM(task);
    queue.push(task);
    inputValue.value = "";
  }
  localStorage.setItem("tasks", JSON.stringify(queue));
};

const pageLoad = () => {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks != null) {
    queue = JSON.parse(storedTasks);
    queue.forEach((item) => addToDOM(item));
  }
};

removeBtn.addEventListener("click", () => {
  removeTask();
});

addBtn.addEventListener("click", () => {
  addTask();
});

pageLoad();

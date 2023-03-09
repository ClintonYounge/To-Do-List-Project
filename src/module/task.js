// Mock the localStorage object
const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      removeItem: (key) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  // Mock the HTML elements
  document.body.innerHTML = `
    <ul id="task-list">
      <li>
        <input type="checkbox" class="checkboxes">
        <span class="task-desc">Task 1</span>
        <span class="delete-task-button"><i class="fas fa-trash"></i></span>
      </li>
    </ul>
  `;
  export const taskList = document.querySelector('#task-list');
  // Update the index property of each task in the array
  function updateTaskIndexes() {
    for (let i = 0; i < taskList.length; i += 1) {
      taskList[i].index = i;
      const taskElement = taskList.children[i];
      const checkbox = taskElement.querySelector('.checkboxes');
      const deleteButton = taskElement.querySelector('.delete-task-button');
      checkbox.dataset.index = i;
      deleteButton.dataset.index = i;
    }
  }
  // Add a new task to the list
  export function addTask(description) {
    if (!description) {
      return; // If the description is empty, don't add the task
    }
    const newTaskElement = document.createElement('li');
    newTaskElement.innerHTML = `
      <input type="checkbox" class="checkboxes">
      <span class="task-desc">${description}</span>
      <span class="delete-task-button"><i class="fas fa-trash"></i></span>
    `;
    taskList.appendChild(newTaskElement);
    updateTaskIndexes();
  }
  // Delete a task from the list
  export function deleteTask(taskItem) {
    if (taskItem && taskItem.remove) {
      taskItem.remove();
      updateTaskIndexes();
    }
  }
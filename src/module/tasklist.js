const taskList = document.querySelector('#task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render all the tasks in the list
export function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.classList.add('checkboxes');
    const taskDescription = document.createElement('span');
    taskDescription.classList.add('task-desc');
    const deleteButton = document.createElement('span');

    deleteButton.classList.add('delete-task-button');

    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = task.completed;
    taskDescription.innerText = task.description;
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    // Add event listeners for checkbox, delete button, and double-click on task description
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;

      taskItem.classList.toggle('completed', task.completed);
      saveTasks();
    });

    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskDescription.addEventListener('dblclick', () => {
      const input = document.createElement('input');
      input.classList.add('edit-desc');
      input.value = task.description;
      taskDescription.replaceWith(input);
      input.focus();

      input.addEventListener('blur', () => {
        task.description = input.value.trim();
        saveTasks();
        renderTasks();
      });
    });

    // Add drag and drop functionality to each task item
    taskItem.draggable = true;

    taskItem.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', index);
    });

    taskItem.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    taskItem.addEventListener('drop', (event) => {
      const startIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
      const endIndex = index;
      const [removed] = tasks.splice(startIndex, 1);
      tasks.splice(endIndex, 0, removed);
      saveTasks();
      renderTasks();
    });
  });
}

// Add a new task to the list
export function addTask(description) {
  tasks.push({
    description,
    completed: false,
    index: tasks.length + 1,
  });
  saveTasks();
  renderTasks();
}

// Delete all checked tasks
export function deleteCheckedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
}
const tasks = [];
// Update the index property of each task in the array
function updateTaskIndexes() {
  const taskList = document.querySelector('#task-list');
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i;
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
  const newTask = {
    description,
    completed: false,
    index: tasks.length,
  };
  tasks.push(newTask);
  const taskList = document.querySelector('#task-list');
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
export function deleteTask(index) {
  tasks.splice(index, 1);
}
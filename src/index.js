import { renderTasks, addTask, deleteCheckedTasks } from './module/tasklist.js';
import './style.css';

const taskForm = document.querySelector('#task-form');
const deleteCheckedTasksButton = document.querySelector('#delete-checked-tasks-button');

// Handle form submission
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTaskInput = document.querySelector('#new-task-input');
  const description = newTaskInput.value.trim();
  if (description !== '') {
    addTask(description);
    newTaskInput.value = '';
  }
});

// Handle delete checked tasks button click
deleteCheckedTasksButton.addEventListener('click', () => {
  deleteCheckedTasks();
});

// Render tasks on page load
renderTasks();
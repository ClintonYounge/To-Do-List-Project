import { renderTasks, addTask } from './module/tasklist.js';
import './style.css';

const taskForm = document.querySelector('#task-form');

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

// Render tasks on page load
renderTasks();
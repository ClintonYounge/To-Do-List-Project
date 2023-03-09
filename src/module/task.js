// Add a new task to the list
export function addTask(description) {
  const taskCount = parseInt(localStorage.getItem('taskCount'), 10) || 0;
  const key = `task-${taskCount}`;
  if (description.trim() !== '') {
    localStorage.setItem(key, description.trim());
    localStorage.setItem('taskCount', taskCount + 1);
  }
}

// Delete a task from the list
export function deleteTask(taskId) {
  localStorage.removeItem(taskId);
}

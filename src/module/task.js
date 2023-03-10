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

// Edit a task's description
export function editTask(taskId, newDescription) {
  const taskDescription = localStorage.getItem(taskId);
  if (taskDescription) {
    localStorage.setItem(taskId, newDescription.trim());
  }
}

// Update a task's completed status
export function updateTaskStatus(taskId, completed) {
  const task = JSON.parse(localStorage.getItem(taskId));
  if (task) {
    task.completed = completed;
    localStorage.setItem(taskId, JSON.stringify(task));
  }
}

export function deleteCheckedTasks() {
  const taskCount = parseInt(localStorage.getItem('taskCount'), 10) || 0;
  const tasksToDelete = [];

  for (let i = 0; i < taskCount; i += 1) {
    const taskKey = `task-${i}`;
    const task = JSON.parse(localStorage.getItem(taskKey));
    if (task && task.completed) {
      tasksToDelete.push(taskKey);
    }
  }

  tasksToDelete.forEach((taskKey) => {
    localStorage.removeItem(taskKey);
  });

  localStorage.setItem('taskCount', taskCount - tasksToDelete.length);
}

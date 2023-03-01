import './style.css';

const listTasks = [
  {
    description: 'Buy groceries',
    completed: false,
    index: 0,
  },
  {
    description: 'Do laundry',
    completed: true,
    index: 1,
  },
  {
    description: 'Clean the house',
    completed: false,
    index: 2,
  },
];

const renderTasks = () => {
  const taskList = document.querySelector('#task-list');

  listTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    const taskDescription = document.createElement('p');
    taskDescription.innerHTML = task.description;
    taskDescription.classList.add('task-desc');
    listItem.appendChild(checkbox);
    listItem.appendChild(taskDescription);

    const menuIcon = document.createElement('span');
    menuIcon.classList.add('fas', 'fa-ellipsis-v', 'menuIcon');
    listItem.appendChild(menuIcon);
    taskList.appendChild(listItem);

    if (index >= 0) {
      const horizontalRule = document.createElement('hr');
      horizontalRule.classList.add('list-hr');
      taskList.appendChild(horizontalRule);
    }
  });
};

renderTasks();
/*
 * @jest-environment jsdom
 */

import { addTask, deleteTask } from '../src/module/task.js';
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
const taskList = document.querySelector('#task-list');
// Tests for addTask function
describe('addTask function', () => {
  test('should add a new task to the task list', () => {
    addTask('Task 2');
    expect(taskList.children.length).toBe(2);
    expect(taskList.children[1].querySelector('.task-desc').textContent).toBe('Task 2');
  });
  test('should not add a task if the description is empty', () => {
    addTask('');
    expect(taskList.children.length).toBe(2);
  });
});
// Tests for deleteTask function
describe('deleteTask function', () => {
  test('should delete a task from the task list', () => {
    const deleteButton = taskList.children[0].querySelector('.delete-task-button');
    deleteButton.click();
    expect(taskList.children.length).toBe(2);
  });
  test('should not delete a task if the index is out of range', () => {
    deleteTask(1);
    expect(taskList.children.length).toBe(2);
  });
});
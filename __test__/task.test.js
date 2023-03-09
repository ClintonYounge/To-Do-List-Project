/*
 * @jest-environment jsdom
 */

import { addTask, deleteTask } from '../src/module/task.js';

// Set up mock localStorage
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

// Tests for addTask function
describe('addTask function', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should add a new task to localStorage', () => {
    addTask('Task 1');
    expect(localStorage.getItem('task-0')).toBe('Task 1');
  });

  test('should increment the task count in localStorage', () => {
    addTask('Task 1');
    addTask('Task 2');
    addTask('Task 3');
    expect(localStorage.getItem('taskCount')).toBe('3');
  });

  test('should not add a task if the description is empty', () => {
    addTask('');
    expect(localStorage.getItem('taskCount')).toBeNull();
  });
});

// Tests for deleteTask function
describe('deleteTask function', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('taskCount', '2');
    localStorage.setItem('task-0', 'Task 1');
    localStorage.setItem('task-1', 'Task 2');
  });

  test('should remove the specified task from localStorage', () => {
    deleteTask('task-1');
    expect(localStorage.getItem('task-1')).toBeNull();
  });

  test('should not throw an error if the specified task does not exist', () => {
    expect(() => deleteTask('task-2')).not.toThrow();
  });
});

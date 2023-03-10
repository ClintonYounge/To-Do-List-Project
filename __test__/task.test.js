/*
 * @jest-environment jsdom
 */

import {
  addTask, deleteTask, editTask, updateTaskStatus, deleteCheckedTasks,
} from '../src/module/task.js';

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
}); describe('editTask function', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('taskCount', '2');
    localStorage.setItem('task-0', 'Task 1');
    localStorage.setItem('task-1', 'Task 2');
  });
  test('should update the description of an existing task', () => {
    editTask('task-1', 'New description');
    expect(localStorage.getItem('task-1')).toBe('New description');
  });
  test('should not update the description of a non-existent task', () => {
    editTask('task-2', 'New description');
    expect(localStorage.getItem('task-2')).toBeNull();
  });
});
// Tests for updateTaskStatus function
describe('updateTaskStatus function', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('taskCount', '2');
    localStorage.setItem('task-0', JSON.stringify({ description: 'Task 1', completed: false }));
    localStorage.setItem('task-1', JSON.stringify({ description: 'Task 2', completed: false }));
  });
  test('should update the completed status of an existing task', () => {
    updateTaskStatus('task-1', true);
    expect(JSON.parse(localStorage.getItem('task-1')).completed).toBe(true);
    updateTaskStatus('task-1', false);
    expect(JSON.parse(localStorage.getItem('task-1')).completed).toBe(false);
  });
  test('should not throw an error if the specified task does not exist', () => {
    expect(() => updateTaskStatus('task-2', true)).not.toThrow();
  });
});
describe('deleteCheckedTasks function', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('taskCount', '3');
    localStorage.setItem('task-0', JSON.stringify({ description: 'Task 1', completed: false }));
    localStorage.setItem('task-1', JSON.stringify({ description: 'Task 2', completed: true }));
    localStorage.setItem('task-2', JSON.stringify({ description: 'Task 3', completed: true }));
  });
  test('should delete checked tasks from localStorage', () => {
    deleteCheckedTasks();
    expect(localStorage.getItem('taskCount')).toBe('1');
    expect(JSON.parse(localStorage.getItem('task-0')).description).toBe('Task 1');
    expect(localStorage.getItem('task-1')).toBeNull();
    expect(localStorage.getItem('task-2')).toBeNull();
  });
});

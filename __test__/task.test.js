/*
 * @jest-environment jsdom
 */

import { addTask, deleteTask, taskList } from '../src/module/task.js';

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
    const taskItem = deleteButton.parentElement;
    deleteTask(taskItem);
    expect(taskList.children.length).toBe(1);
  });
  test('should not delete a task if the index is out of range', () => {
    deleteTask(taskList.children.length);
    expect(taskList.children.length).toBe(1);
  });
});
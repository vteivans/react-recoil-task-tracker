import { atom } from 'recoil';

export const tasksState = atom({
  key: 'tasks',
  default: [],
});

export const showAddTaskState = atom({
  key: 'showAddTask',
  default: false,
});

import * as types from '../constants/ActionTypes';

export const toggleTodoDialog = (isOpen, todo) => ({type: types.TOGGLE_TODO_DIALOG, isOpen, todo});
export const addTodo = (text, date)=> ({type: types.ADD_TODO, text, date});
export const deleteTodo = id => ({type: types.DELETE_TODO, id});
export const editTodo = (id, text, date) => ({type: types.EDIT_TODO, id, text, date});
export const completeTodo = id => ({type: types.COMPLETE_TODO, id});
export const completeAll = () => ({type: types.COMPLETE_ALL});
export const clearCompleted = () => ({type: types.CLEAR_COMPLETED});

export const filterTodo  = (status, startDate, endDate) => ({type: types.FILTER_TODO, status, startDate, endDate});
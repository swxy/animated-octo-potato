import * as types from '../constants/ActionTypes';
import {addTodoToDb, deleteTodoFromDb, getTodosFromDb} from '../model/db';

export const toggleTodoDialog = (isOpen, todo) => ({type: types.TOGGLE_TODO_DIALOG, isOpen, todo});

export const addTodo = (text, date)=> (dispatch, getState) => {
    addTodoToDb({
        text: text,
        date: date,
        completed: false
    }).then(res => {
        return dispatch({type: types.ADD_TODO, text, date});
    });
};
export const deleteTodo = id => (dispatch) => {
    deleteTodoFromDb(id).then(res => {
        return dispatch({type: types.DELETE_TODO, id});
    }, err => {
        console.error(err);
        getTodos();
    });
};
export const editTodo = (id, text, date) => ({type: types.EDIT_TODO, id, text, date});
export const completeTodo = id => ({type: types.COMPLETE_TODO, id});
export const completeAll = () => ({type: types.COMPLETE_ALL});
export const clearCompleted = () => ({type: types.CLEAR_COMPLETED});

export const filterTodo  = (status, startDate, endDate) => ({type: types.FILTER_TODO, status, startDate, endDate});

export const getTodos = (todos) => (dispatch) => {
    getTodosFromDb().then(todos => {
       return dispatch({type: types.GET_TODOS, todos})
    });
};
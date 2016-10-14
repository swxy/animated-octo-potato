import * as types from '../constants/ActionTypes';
import {addTodoToDb, deleteTodoFromDb, getTodosFromDb, updateTodoSyncDb} from '../model/db';
import { doFilter } from './doFilter';

function queryTodos (dispatch, state) {
    const filter = doFilter(state.todoFilter);
    return getTodosFromDb(filter).then(todos => {
        return dispatch({type: types.GET_TODOS, todos})
    });
}

export const toggleTodoDialog = (isOpen, todo) => ({type: types.TOGGLE_TODO_DIALOG, isOpen, todo});

export const addTodo = (text, date)=> (dispatch, getState) => {
    addTodoToDb({
        text: text,
        date: date,
        completed: false
    }).then(res => {
        queryTodos(dispatch, getState());
    });
};

export const deleteTodo = id => (dispatch, getState) => {
    deleteTodoFromDb(id).then(res => {
        queryTodos(dispatch, getState());
    });
};

export const editTodo = (id, todo) => (dispatch, getState) => {
    updateTodoSyncDb(id, todo).then(res => {
        queryTodos(dispatch, getState());
    });
};

export const completeTodo = todo => (dispatch, getState) => {
    updateTodoSyncDb(todo.id, {
        completed: !todo.completed
    }).then(res => {
        queryTodos(dispatch, getState());
    });
};

export const getTodos = () => (dispatch, getState) => {
    queryTodos(dispatch, getState());
};

//export const completeAll = () => ({type: types.COMPLETE_ALL});
//export const clearCompleted = () => ({type: types.CLEAR_COMPLETED});

export const filterTodo  = (filters) => (dispatch, getState) => {
    dispatch({type: types.FILTER_TODO, filters});
    queryTodos(dispatch, getState());
};

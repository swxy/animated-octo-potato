import * as types from '../constants/ActionTypes';
import {addTodoToDb, deleteTodoFromDb, getTodosFromDb, updateTodoSyncDb} from '../model/db';

function queryTodos (dispatch) {
    return getTodosFromDb().then(todos => {
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
        queryTodos(dispatch);
    });
};
export const deleteTodo = id => (dispatch) => {
    deleteTodoFromDb(id).then(res => {
        queryTodos(dispatch);
    });
};
export const editTodo = (id, todo) => (dispatch) => {
    updateTodoSyncDb(id, todo).then(res => {
        queryTodos(dispatch);
    });
};
export const completeTodo = todo => (dispatch) => {
    updateTodoSyncDb(todo.id, {
        completed: !todo.completed
    }).then(res => {
        queryTodos(dispatch);
    });
};
export const completeAll = () => ({type: types.COMPLETE_ALL});
export const clearCompleted = () => ({type: types.CLEAR_COMPLETED});

export const filterTodo  = (status, startDate, endDate) => ({type: types.FILTER_TODO, status, startDate, endDate});

export const getTodos = () => (dispatch) => {
    queryTodos(dispatch);
};
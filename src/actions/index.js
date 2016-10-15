import * as types from '../constants/ActionTypes';
import {addTodoToDb, deleteTodoFromDb, getTodosFromDb, updateTodoSyncDb} from '../model/pouchdb';
import { doFilter } from './doFilter';

function queryTodos (dispatch, state) {
    const filter = doFilter(state.todoFilter);
    return getTodosFromDb(filter).then(todos => {
        const transformTodo = todos.rows.map(row => {return row.doc});
        return dispatch({type: types.GET_TODOS, todos: transformTodo});
    });
}

export const toggleTodoDialog = (isOpen, todo) => ({type: types.TOGGLE_TODO_DIALOG, isOpen, todo});

export const addTodo = (todo)=> (dispatch, getState) => {
    addTodoToDb(todo).then(res => {
        queryTodos(dispatch, getState());
    });
};

export const deleteTodo = todo => (dispatch, getState) => {
    deleteTodoFromDb(todo).then(res => {
        queryTodos(dispatch, getState());
    });
};

export const editTodo = (todo) => (dispatch, getState) => {
    updateTodoSyncDb(todo).then(res => {
        queryTodos(dispatch, getState());
    });
};

export const completeTodo = todo => (dispatch, getState) => {
    updateTodoSyncDb({
        ...todo,
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

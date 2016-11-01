import * as types from '../constants/ActionTypes';
import {addTodoToDb, bulkAddTodosToDb, deleteTodoFromDb, getTodosFromDb, getTagsFromDb, updateTodoSyncDb} from '../model/pouchdb';
import { doFilter } from './doFilter';
import { SWITCH_MENU } from '../constants/ActionTypes';

function queryTodos (dispatch, state) {
    const filter = doFilter(state.todoFilter, state.navigation);
    return getTodosFromDb().then(todos => {
        const transformTodo = [];
        // 过滤数据
        for (let todoDoc of todos.rows) {
            if (filter(todoDoc.doc)) {
                transformTodo.push(todoDoc.doc);
            }
        }
        return dispatch({type: types.GET_TODOS, todos: transformTodo});
    });
}

export const getTags = () => (dispatch, getState) => {
    if (getState().tags.length) {
        return getState().tags;
    }
    return getTagsFromDb().then(tags => {
        console.log('get tags success', tags);
        return dispatch({type: types.GET_TAGS, tags: tags});
    });
};

export const addTags = (tags) => ({type: types.ADD_TAGS, tags});

export const toggleTodoDialog = (isOpen, todo) => ({type: types.TOGGLE_TODO_DIALOG, isOpen, todo});

export const addTodo = (todo)=> (dispatch, getState) => {
    addTodoToDb(todo).then(res => {
        queryTodos(dispatch, getState());
    });
};

export const bulkAddTodos = (todos) => (dispatch, getState) => {
    bulkAddTodosToDb(todos).then(res => {
        queryTodos(dispatch, getState());
    })
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

export const switchMenu = (key) => (dispatch, getState) => {
    dispatch({type: SWITCH_MENU, key});
    console.log('switch: ' + key);
    queryTodos(dispatch, getState());
};

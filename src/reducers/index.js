import { combineReducers } from 'redux';
import todos from './todos';
import todoDialog from './todoDialog'

const rootReducer = combineReducers({
    todos,
    todoDialog
});

export default rootReducer;
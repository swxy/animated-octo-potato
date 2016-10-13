import { combineReducers } from 'redux';
import todos from './todos';
import todoDialog from './todoDialog';
import todoFilter from './todoFilter';

const rootReducer = combineReducers({
    todos,
    todoDialog,
    todoFilter
});

export default rootReducer;
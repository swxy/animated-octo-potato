import { combineReducers } from 'redux';
import todos from './todos';
import todoDialog from './todoDialog';
import todoFilter from './todoFilter';
import tags from './tags';

const rootReducer = combineReducers({
    todos,
    todoDialog,
    todoFilter,
    tags
});

export default rootReducer;
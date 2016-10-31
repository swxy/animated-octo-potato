import { combineReducers } from 'redux';
import todos from './todos';
import todoDialog from './todoDialog';
import todoFilter from './todoFilter';
import tags from './tags';
import navigation from './navigate';

const rootReducer = combineReducers({
    todos,
    todoDialog,
    todoFilter,
    tags,
    navigation
});

export default rootReducer;
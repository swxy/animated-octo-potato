import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED, GET_TODOS } from '../constants/ActionTypes';

const initialState = [
    {
        text: 'Use Redux',
        date: '2016-10-12',
        completed: false,
        id: 0
    }
];

export default function todos (state = initialState, action) {
    switch (action.type) {
        case GET_TODOS:
            return [...action.todos];
        case ADD_TODO:
            return [
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    completed: false,
                    text: action.text,
                    date: action.date
                },
                ...state
            ];

        case DELETE_TODO:
            return state.filter(todo => todo.id !== action.id);

        case EDIT_TODO:

            return state.map(todo =>
                todo.id === action.id ? {...todo, text: action.text, date: action.date} : todo
            );

        case COMPLETE_TODO:
            return state.map(todo =>
                todo.id === action.id ?
                {...todo, completed: !todo.completed } :
                todo
            );

        case COMPLETE_ALL:
            const areAllMarked = state.every(todo => todo.completed);
            return state.map(todo => ({
                ...todo,
                completed: !areAllMarked
            }));

        case CLEAR_COMPLETED:
            return state.filter(todo => todo.completed === false);

        default:
            return state
    }
}
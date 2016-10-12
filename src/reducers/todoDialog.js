import { TOGGLE_TODO_DIALOG } from '../constants/ActionTypes';

const initialState = {
    visible: false,
    todo: {}
};

export default function todoDialog (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_TODO_DIALOG:
            let nextState = {todo: {}, visible: !state.visible};
            if (action.todo) {
                nextState.todo = action.todo;
            }
            if (typeof action.isOpen === 'boolean') {
                nextState.visible = action.isOpen;
            }
            return nextState;

        default:
            return state
    }
}
import { SWITCH_MENU } from '../constants/ActionTypes';
import { TODOS } from '../constants/NavigationTypes';

export default function navigation (state = TODOS, action) {
    switch (action.type) {
        case SWITCH_MENU:
            return action.key;
        default:
            return state;
    }
}
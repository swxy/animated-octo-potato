import { GET_TAGS, ADD_TAGS } from '../constants/ActionTypes';

const initialState = [];

export default function tags (state = initialState, action) {
    switch (action.type) {
        case GET_TAGS:
            return [...action.tags];
        case ADD_TAGS:
            return [...state, ...action.tags];
        default:
            return state;
    }
}
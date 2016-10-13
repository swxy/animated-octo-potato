import * as Filters from '../constants/TodoFilters';
import { FILTER_TODO } from '../constants/ActionTypes';

const initialState = {
    status: Filters.SHOW_ALL,
    startDate: null,
    endDate: null,
};

export default function TodoFilter (state=initialState, action) {
    switch (action.type) {
        case FILTER_TODO:
            return {status: action.status, startDate: action.startDate, endDate: action.endDate};
        default:
            return state;
    }
}
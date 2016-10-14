import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import moment from 'moment';

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed
};

export function doFilter (todoFilters) {
    const {status, startDate, endDate} = todoFilters;
    return (todo) => {
        if (TODO_FILTERS[status](todo)) {
            if (startDate && endDate) {
                return moment(todo.date).isBetween(startDate, endDate);
            }
            if (startDate) {
                return moment(todo.date).isAfter(startDate);
            }
            if (endDate) {
                return moment(todo.date).isBefore(endDate);
            }
            return true;
        }
        return false;
    }
}

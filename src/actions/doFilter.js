import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import * as MenuItemType from '../constants/NavigationTypes';
import moment from 'moment';

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed
};

/**
 * 需要根据过滤条件和当前选中的标签页来判断
 * @param todoFilters
 * @param navigation
 * @return {function(*=)}
 */
export function doFilter (todoFilters, navigation) {
    const {status, startDate, endDate} = todoFilters;
    return (todo) => {
        switch (navigation) {
            case MenuItemType.TODOS: {
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
            case MenuItemType.TODAY: {
                if (todo.date) {
                    return moment(todo.date).isSame(new Date(), 'day');
                }
                return false;
            }
        }
    }
}

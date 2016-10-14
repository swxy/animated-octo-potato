import { doFilter } from '../../src/actions/doFilter';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../src/constants/TodoFilters';

const todos = [
    {
        id: 1,
        text: 'text1',
        date: '2016-10-01',
        completed: false
    },
    {
        id: 2,
        text: 'text2',
        date: '2016-10-05',
        completed: true
    },
    {
        id: 3,
        text: 'text3',
        date: '2016-10-20',
        completed: false
    }
];

function commonCheck (todoFilters, result) {
    const filterFunc = doFilter(todoFilters);
    expect(todos.filter(filterFunc)).toEqual(result);
}

describe('todo filter status', () => {

    it('doFilter should filter status equal to all', () => {
        const todoFilters = {status: SHOW_ALL, startDate: null, endDate: null};
        commonCheck(todoFilters, todos);
    });
    it('doFilter should filter status equal to active', () => {
        const todoFilters = {status: SHOW_ACTIVE, startDate: null, endDate: null};
        commonCheck (todoFilters, [todos[0], todos[2]]);
    });
    it('doFilter should filter status equal to completed', () => {
        const todoFilters = {status: SHOW_COMPLETED, startDate: null, endDate: null};
        commonCheck (todoFilters, [todos[1]]);
    });

});

describe('todo filter startDate', () => {
    it('doFilter should filter startDate greater than 2016-10-02', () => {
        const todoFilters = {status: SHOW_ALL, startDate: '2016-10-02', endDate: null};
        commonCheck (todoFilters, [todos[1], todos[2]]);
    });

    it('doFilter should filter startDate greater than 2016-10-30', () => {
        const todoFilters = {status: SHOW_ALL, startDate: '2016-10-30', endDate: null};
        commonCheck (todoFilters, []);
    });
});

describe('todo filter endDate', () => {
    it('doFilter should filter startDate less than 2016-10-02', () => {
        const todoFilters = {status: SHOW_ALL, startDate: null, endDate: '2016-10-02'};
        commonCheck (todoFilters, [todos[0]]);
    });

    it('doFilter should filter startDate less than 2016-10-30', () => {
        const todoFilters = {status: SHOW_ALL, startDate: null, endDate: '2016-10-30'};
        commonCheck (todoFilters, todos);
    });
});

describe('todo filter startDate && endDate', () => {
    it('doFilter should filter date between 2016-10-02 & 2016-10-30', () => {
        const todoFilters = {status: SHOW_ALL, startDate: '2016-10-02', endDate: '2016-10-30'};
        commonCheck (todoFilters, [todos[1], todos[2]]);
    });

    it('doFilter should filter date between 2016-11-30 & 2016-10-01 equal null', () => {
        const todoFilters = {status: SHOW_ALL, startDate: '2016-11-30', endDate: '2016-10-01'};
        commonCheck (todoFilters, []);
    });
});

describe('todo filter status && startDate && endDate', () => {
    it('doFilter should filter status complete and date between 2016-10-02 & 2016-10-30', () => {
        const todoFilters = {status: SHOW_COMPLETED, startDate: '2016-10-02', endDate: '2016-10-30'};
        commonCheck (todoFilters, [todos[1]]);
    });
});
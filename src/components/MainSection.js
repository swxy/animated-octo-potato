import React, { Component, PropTypes } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import TodayNeedTodo from './TodayNeedTodo';
import Time from './Time';
import * as MenuItemType from '../constants/NavigationTypes';

export default class MainSection extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
        filters: PropTypes.object.isRequired,
        current: PropTypes.string.isRequired
    };

    getTabContent () {
        const { todos, actions, current } = this.props;
        let todayTab = (
            <section className="main">
                <TodayNeedTodo todos={todos} {...actions} />
            </section>
        );
        const todoTab = (
            <section className="main">
                <Header
                    todoConstraint={this.props.filters}
                    toggleTodoDialog={actions.toggleTodoDialog}
                    filterTodo={actions.filterTodo}/>
                <TodoList todos={todos} todoConstraint={this.props.filters} {...actions} />
            </section>
        );
        const timeTab = (
            <section className="main">
                <Time />
            </section>
        );
        switch (current) {
            case MenuItemType.TODAY:
                return todayTab;
            case MenuItemType.TODOS:
                return todoTab;
            case MenuItemType.TIME:
                return timeTab;
        }
    }

    render () {
        return this.getTabContent()
     }
}
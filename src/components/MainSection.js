import React, { Component, PropTypes } from 'react';
import Header from './Header';
import TodoList from './TodoList';

export default class MainSection extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
        constraint: PropTypes.object.isRequired
    };

    render () {
        const { todos, actions } = this.props;
        return (
            <section className="main">
                <Header
                    todoConstraint={this.props.constraint}
                    toggleTodoDialog={actions.toggleTodoDialog}
                    filterTodo={actions.filterTodo}/>
                <TodoList todos={todos} todoConstraint={this.props.constraint} {...actions} />
            </section>
        )
     }
}
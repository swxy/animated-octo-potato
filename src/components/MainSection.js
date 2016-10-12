import React, { Component, PropTypes } from 'react';
import Header from './Header';
import TodoList from './TodoList';

export default class MainSection extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
        toggleTodoDialog: PropTypes.func.isRequired
    };

    render () {
        const { todos, actions } = this.props;
        return (
            <section className="main">
                <Header toggleTodoDialog={this.props.toggleTodoDialog}/>
                <TodoList todos={todos} {...actions}/>
            </section>
        )
     }
}
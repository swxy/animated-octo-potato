import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

export default class TodoItem extends Component {
    static propTypes = {
        todo: PropTypes.object.isRequired,
        editTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired,
        toggleTodoDialog: PropTypes.func.isRequired
    };

    state = {
        editing: false
    };

    handleDoubleClick = () => {
        //this.setState({ editing: true });
        this.props.toggleTodoDialog(true, this.props.todo);
    };

    handleSave = (id, text) => {
        if (text.length === 0 ) {
            this.props.deleteTodo(id);
        } else {
            this.props.editTodo(id, text);
        }
        this.setState({ editing: false });
    };

    render () {
        const { todo, completeTodo, deleteTodo } = this.props;
        let element;
        if (this.props.editing) {
            element = (<TodoTextInput
                text={todo.text}
                editing={this.state.editing}
                onSave={(text) => this.handleSave(todo.id, text)} />)
        }
        else {
            element = (
                <div className="view">
                    <input  type="checkbox"
                            className="toggle"
                            checked={todo.completed}
                            onChange={() => completeTodo(todo.id)} />
                    <label onDoubleClick={this.handleDoubleClick}>
                        {todo.text} --- {todo.date}
                    </label>
                    <button className="destroy" onClick={() => deleteTodo(todo.id)} />
                </div>
            )
        }
        return (
            <li className={classnames({
                completed: todo.completed,
                editing: this.state.editing
            })}>
                {element}
            </li>
        )
    }
}
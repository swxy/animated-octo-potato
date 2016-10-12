import React, { PropTypes, Component } from 'react';
import { Button } from 'antd';
import TodoTextInput from './TodoTextInput';

export default class Header extends Component {
    static propTypes = {
        addTodo: PropTypes.func.isRequired,
        toggleTodoDialog: PropTypes.func.isRequired
    };
    handleSave = text => {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    };

    showModal = e => {
        this.props.toggleTodoDialog(true);
    };

    render() {
        return (
            <header className="header">
                <h1>todos <Button type="primary" onClick={this.showModal}>Add Todo</Button></h1>
            </header>
        )
    }
}
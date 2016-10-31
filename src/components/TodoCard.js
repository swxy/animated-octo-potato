import React, { Component, PropTypes } from 'react';
import { Card, Modal, Icon, Tag } from 'antd';

const confirmModal = Modal.confirm;

export default class TodoCard extends Component {
    static propTypes = {
        deleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired,
        toggleTodoDialog: PropTypes.func.isRequired,
        todo: PropTypes.object.isRequired
    };

    deleteTodo(todo) {
        const delTodo = this.props.deleteTodo;
        confirmModal({
            title: '确定删除?',
            content: '即将删除 ' + todo.text + ' 这条todo',
            onOk() {
                delTodo(todo);
            }
        });
    }

    render () {
        const {completeTodo, toggleTodoDialog, todo} = this.props;
        const delComponent = (<Icon type="close" onClick={this.deleteTodo.bind(this, todo)} />);
        const colors = ['blue', 'green', 'yellow', 'red'];
        const tags = (todo.tags||[]).map((tag, idx) => {
            return (<Tag key={'todo-tag' + idx} closable={false} color={colors[idx%4]} size="small"><Icon type="tag-o" />{tag}</Tag>)
        });

        return (
            <Card title={todo.text} extra={delComponent}>
                <div className="">{tags}</div>
            </Card>
        )
    }
}
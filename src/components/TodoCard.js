import React, { Component, PropTypes } from 'react';
import { Card, Modal, Icon, Tag, Popconfirm } from 'antd';

const confirmModal = Modal.confirm;

export default class TodoCard extends Component {
    static propTypes = {
        deleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired,
        toggleTodoDialog: PropTypes.func.isRequired,
        todo: PropTypes.object.isRequired
    };

    render () {
        const {completeTodo, toggleTodoDialog, todo, deleteTodo} = this.props;
        const delComponent = (
            <Popconfirm title={"确定删除" + todo.text + "?"} onConfirm={deleteTodo.bind(null, todo)} okText="确定" cancelText="取消" placement="bottom">
                <Icon type="close"/>
            </Popconfirm>
        );
        const colors = ['blue', 'green', 'yellow', 'red'];
        const tags = (todo.tags||[]).map((tag, idx) => {
            return (<Tag key={'todo-tag' + idx} closable={false} color={colors[idx%4]} size="small"><Icon type="tag-o" />{tag}</Tag>)
        });

        return (
            <Card title={todo.text} extra={delComponent}
                  style={{borderColor: todo.completed ? '#87d068' : '#f50'}}
                  onDoubleClick={completeTodo.bind(null, todo)}>
                <div className="">{tags}</div>
            </Card>
        )
    }
}
import React, { Component, PropTypes } from 'react';
import { Table, Modal } from 'antd';
import moment from 'moment';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed
}
const confirmModal = Modal.confirm;

export default class TodoList extends Component {

    static propTypes = {
        deleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired,
        toggleTodoDialog: PropTypes.func.isRequired,
        todoConstraint: PropTypes.object.isRequired
    };

    state = {
        selectedRowKeys: []
    };

    deleteTodo(todo) {
        const delTodo = this.props.deleteTodo;
        confirmModal({
            title: '确定删除?',
            content: '即将删除 ' + todo.text + ' 这条todo',
            onOk() {
                delTodo(todo.id);
            }
        });
    }

    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    onFilter (todos) {
        const {status, startDate, endDate} = this.props.todoConstraint;
        const filteredTodos = todos.filter((todo) => {
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
        });
        return filteredTodos;
    }

    render () {
        const {completeTodo, toggleTodoDialog, todos} = this.props;
        const filteredTodos = this.onFilter(todos);
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };

        const columns = [{
            title: '序号',
            key: 'id',
            render: (text, record, index) => (index + 1)
        }, {
            title: '待办',
            dataIndex: 'text',
            key: 'text'
        }, {
            title: '日期',
            dataIndex: 'date',
            key: 'date'
        }, {
            title: '状态',
            dataIndex: 'completed',
            key: 'completed',
            render: (text, record) => (
                text ? '已完成' : '未完成'
            )
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span>
                    <a href="javascript:void 0" onClick={completeTodo.bind(null, record)}>{record.completed ? '恢复' : '完成'}</a>
                    <span className="ant-divider" />
                    <a href="javascript:void 0" onClick={() => {toggleTodoDialog(true, record)}}>编辑</a>
                    <span className="ant-divider" />
                    <a href="javascript:void 0" onClick={this.deleteTodo.bind(this, record)}>删除</a>
                </span>
            )
        }];

        return (
            <div className="main-table">
                <Table rowSelection={rowSelection} columns={columns} dataSource={filteredTodos}></Table>
            </div>
        )
    }
}
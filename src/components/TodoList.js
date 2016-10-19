import React, { Component, PropTypes } from 'react';
import { Table, Modal, Button } from 'antd';

const confirmModal = Modal.confirm;

export default class TodoList extends Component {

    static propTypes = {
        deleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired,
        toggleTodoDialog: PropTypes.func.isRequired,
        todoConstraint: PropTypes.object.isRequired,
        todos: PropTypes.array.isRequired
    };

    state = {
        selectedRowKeys: [],
        downloadUri: ''
    };

    handleDownload () {
        const str = JSON.stringify(this.props.todos);
        const uri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(str);
        this.setState({downloadUri: uri});
    }

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

    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render () {
        const {completeTodo, toggleTodoDialog, todos} = this.props;
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };

        const columns = [{
            title: '序号',
            render: (text, record, index) => (index + 1),
            width: 50
        }, {
            title: '待办',
            dataIndex: 'text',
            width: 500,
            key: 'text'
        }, {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            render: (text, recode) => ((text||[]).join(' | '))
        },{
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
                <div className="export" style={{marginBottom: 20}}>
                    <a href={this.state.downloadUri} download="todos.json">
                        <Button type="dashed" onClick={this.handleDownload.bind(this)}>export json</Button>
                    </a>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={todos}></Table>
            </div>
        )
    }
}
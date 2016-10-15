import React, { Component, PropTypes } from 'react';
import { Modal, Button, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

export default class TodoDialog extends Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        toggleTodoDialog: PropTypes.func.isRequired,
        todo: PropTypes.object.isRequired,
        placeholder: PropTypes.string,
        visible: PropTypes.bool.isRequired
    };

    state = {
        text: this.props.todo.text || '',
        date: this.props.todo.date ? moment(this.props.todo.date) : null
    };

    handleChange = e => {
        this.setState({text: e.target.value});
    };

    handleDateChange = (date, dateString) => {
        this.setState({date: date});
    };

    hideModal() {
        this.props.toggleTodoDialog(false);
    }

    clearState () {
        this.setState({text: '', date: null});
    }

    handleOk() {
        const text = this.state.text;
        const date = this.state.date ? this.state.date.format('YYYY-MM-DD') : null;
        const id = this.props.todo._id;
        if (id !== undefined) {
            this.props.onEdit({...this.props.todo, text, date});
        }
        else {
            this.props.onSave({text, date, completed: false});
        }
        this.hideModal();
        this.clearState();
    }

    handleCancel(e) {
        this.hideModal();
        this.clearState();
    }


    componentWillReceiveProps(nextProps) {
        const todo = nextProps.todo;
        if (todo.text) {
            this.setState({text: todo.text, date: todo.date ? moment(todo.date) : null});
        }
    }

    render () {
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return (
            <Modal title="Basic Modal" visible={this.props.visible}
                   onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
            >
                <Form horizontal>
                    <FormItem
                        id="control-input"
                        {...formItemLayout}
                        label="Todo">
                        <Input id="control-input" onChange={this.handleChange} placeholder={this.props.placeholder} value={this.state.text}/>
                    </FormItem>
                    <FormItem
                        id="control-date"
                        {...formItemLayout}
                        label="Date">
                        <DatePicker id="control-date" value={this.state.date} onChange={this.handleDateChange} />
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
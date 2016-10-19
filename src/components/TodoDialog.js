import React, { Component, PropTypes } from 'react';
import { Modal, Select, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

export default class TodoDialog extends Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        onAddTag: PropTypes.func.isRequired,
        toggleTodoDialog: PropTypes.func.isRequired,
        todo: PropTypes.object.isRequired,
        placeholder: PropTypes.string,
        visible: PropTypes.bool.isRequired,
        dataSource: PropTypes.array.isRequired
    };

    state = {
        text: this.props.todo.text || '',
        date: this.props.todo.date ? moment(this.props.todo.date) : null,
        tags: (this.props.todo.tags||[]).map(tag => ({key: tag, label: tag}))
    };

    handleChange = e => {
        this.setState({text: e.target.value});
    };

    handleDateChange = (date) => {
        this.setState({date: date});
    };

    handleTagChange = (value) => {
        this.setState({tags:value});
    };

    hideModal() {
        this.props.toggleTodoDialog(false);
    }

    clearState () {
        this.setState({text: '', date: null, tags: []});
    }

    parseTags (tags) {
        let total = tags.map(tag => (tag.label));
        let newTags = [];
        const dataSource = this.props.dataSource;
        for (let tag of total) {
            if (!(tag in dataSource)) {
                newTags.push(tag);
            }
        }
        return {total, newTags};
    }

    handleOk() {
        const text = this.state.text;
        const date = this.state.date ? this.state.date.format('YYYY-MM-DD') : null;
        const id = this.props.todo._id;
        const tagObj = this.parseTags(this.state.tags);
        const tags = tagObj.total;
        const newTags = tagObj.newTags;
        if (id !== undefined) {
            this.props.onEdit({...this.props.todo, text, date, tags});
        }
        else {
            this.props.onSave({text, date, tags, completed: false});
        }
        if (newTags.length) {
            this.props.onAddTag(newTags);
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
            this.setState({text: todo.text, date: todo.date ? moment(todo.date) : null, tags: todo.tags.map(tag => ({key: tag, label: tag}))});
        }
    }

    render () {
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        const children = [];
        this.props.dataSource.forEach((tag) => {
            children.push(<Option key={tag} value={tag}>{tag}</Option>);
        });
        return (
            <Modal title="Basic Modal" visible={this.props.visible}
                   onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                <Form horizontal>
                    <FormItem
                        id="control-input"
                        {...formItemLayout}
                        label="Todo">
                        <Input type="textarea" id="control-input" onChange={this.handleChange} placeholder={this.props.placeholder} value={this.state.text}/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Tags">
                        <Select
                            tags
                            labelInValue
                            value={this.state.tags}
                            onChange={this.handleTagChange}>
                            {children}
                        </Select>
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
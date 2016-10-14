import React, { PropTypes, Component } from 'react';
import { Button, Form, DatePicker, Select } from 'antd';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import moment from 'moment';

const FILTER_TITLES = {
    [SHOW_ALL]: '全部',
    [SHOW_ACTIVE]: '未完成',
    [SHOW_COMPLETED]: '已完成'
};

const FormItem = Form.Item;
const Option = Select.Option;

export default class Header extends Component {
    static propTypes = {
        toggleTodoDialog: PropTypes.func.isRequired,
        todoConstraint: PropTypes.object.isRequired,
        filterTodo: PropTypes.func.isRequired
    };
    state = {
        status: this.props.todoConstraint.status || SHOW_ALL,
        startDate: this.props.todoConstraint.startDate ? moment(this.props.todoConstraint.startDate) : null,
        endDate: this.props.todoConstraint.endDate ? moment(this.props.todoConstraint.endDate) : null,
        endOpen: false
    };
    handleSave = text => {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    };
    handleChange = value => {
        this.setState({status: value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const {status, startDate, endDate} = this.state;
        this.props.filterTodo({status, startDate, endDate});
    };

    disabledStartDate(startDate) {
        if (!startDate || !this.state.endDate) {
            return false;
        }
        return startDate.valueOf() > this.state.endDate.valueOf();
    };
    disabledEndDate(endDate) {
        if (!endDate || !this.state.startDate) {
            return false;
        }
        return endDate.valueOf() <= this.state.startDate.valueOf();
    };

    onChange(field, value) {
        this.setState({
            [field]: value,
        });
    };
    onStartChange(value) {
        this.onChange('startDate', value);
    };
    onEndChange(value) {
        this.onChange('endDate', value);
    };
    handleStartOpenChange(open) {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };
    handleEndOpenChange(open) {
        this.setState({ endOpen: open });
    };

    showModal = e => {
        this.props.toggleTodoDialog(true);
    };

    render() {
        return (
            <header className="main-header">
                <Form inline onSubmit={this.handleSubmit}>
                    <FormItem
                        id="control-status"
                        label="状态">
                        <Select defaultValue={this.state.status} style={{ width: 120 }} onChange={this.handleChange}>
                            {[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
                                <Option key={filter} value={filter}>
                                    {FILTER_TITLES[filter]}
                                </Option>
                            )}
                        </Select>
                    </FormItem>
                    <FormItem
                        id="control-date"
                        label="日期">
                        <DatePicker
                            disabledDate={this.disabledStartDate.bind(this)}
                            value={this.state.startDate}
                            placeholder="Start"
                            onChange={this.onStartChange.bind(this)}
                            onOpenChange={this.handleStartOpenChange.bind(this)}
                        />
                        {' - '}
                        <DatePicker
                            disabledDate={this.disabledEndDate.bind(this)}
                            value={this.state.endDate}
                            placeholder="End"
                            onChange={this.onEndChange.bind(this)}
                            open={this.state.endOpen}
                            onOpenChange={this.handleEndOpenChange.bind(this)}
                        />
                    </FormItem>
                    <Button type="primary" className="offset-15" htmlType="submit">查询</Button>
                    <Button type="ghost" htmlType="button" onClick={this.showModal.bind(this)}>添加Todo</Button>
                </Form>
            </header>
        )
    }
}
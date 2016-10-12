import React, { PropTypes, Component } from 'react';
import { Button, Form, DatePicker, Select } from 'antd';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const FILTER_TITLES = {
    [SHOW_ALL]: '全部',
    [SHOW_ACTIVE]: '未完成',
    [SHOW_COMPLETED]: '已完成'
};

const FormItem = Form.Item;
const Option = Select.Option;

export default class Header extends Component {
    static propTypes = {
        toggleTodoDialog: PropTypes.func.isRequired
    };
    state = {
        status: this.props.status || SHOW_ALL,
        startValue: null,
        endValue: null,
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

    };

    disabledStartDate(startValue) {
        if (!startValue || !this.state.endValue) {
            return false;
        }
        return startValue.valueOf() > this.state.endValue.valueOf();
    };
    disabledEndDate(endValue) {
        if (!endValue || !this.state.startValue) {
            return false;
        }
        return endValue.valueOf() <= this.state.startValue.valueOf();
    };

    onChange(field, value) {
        this.setState({
            [field]: value,
        });
    };
    onStartChange(value) {
        this.onChange('startValue', value);
    };
    onEndChange(value) {
        this.onChange('endValue', value);
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
                            value={this.state.startValue}
                            placeholder="Start"
                            onChange={this.onStartChange.bind(this)}
                            onOpenChange={this.handleStartOpenChange.bind(this)}
                        />
                        {' - '}
                        <DatePicker
                            disabledDate={this.disabledEndDate.bind(this)}
                            value={this.state.endValue}
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
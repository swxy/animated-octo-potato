import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'antd';
import TodoCard from './TodoCard';

export default class TodayNeedTodo extends Component {
    static propTypes = {
        deleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired,
        toggleTodoDialog: PropTypes.func.isRequired,
        todos: PropTypes.array.isRequired
    };

    render() {
        const {completeTodo, toggleTodoDialog, deleteTodo, todos} = this.props;
        const todoCards = todos.map((todo, idx) => {
            return (
                <Col span={5} offset={1}  key={'todo-card' + idx} style={{marginBottom: '15px'}}>
                    <TodoCard
                        todo={todo}
                        completeTodo={completeTodo}
                        toggleTodoDialog={toggleTodoDialog}
                        deleteTodo={deleteTodo}/>
                </Col>)
        });
        return (
            <div>
                <Row type='flex' justify="start">
                    {todoCards}
                </Row>
            </div>
        )
    }
}
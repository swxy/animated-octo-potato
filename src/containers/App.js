import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import MainSection from '../components/MainSection';
import TodoDialog from '../components/TodoDialog';
import * as TodoActions from '../actions';

import DB, {getTodos, closeDb} from '../model/db';

class App extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
        dialogData: PropTypes.object.isRequired,
        filters: PropTypes.object.isRequired,
        tags: PropTypes.array.isRequired
    };

    componentDidMount() {
        const {actions} = this.props;
        actions.getTodos();
        actions.getTags();
    }

    componentWillUnmount() {
        console.log('component unmout');
        closeDb();
    }

    render() {
        const {todos, dialogData, filters, actions, tags} = this.props;
        return (
            <div className="page-wrapper">
                <Navigation/>
                <MainSection todos={todos} filters={filters} actions={actions}/>
                <TodoDialog
                    onEdit={actions.editTodo}
                    onAddTag={actions.addTags}
                    onSave={actions.addTodo}
                    visible={dialogData.visible}
                    todo={dialogData.todo}
                    dataSource={tags}
                    toggleTodoDialog={actions.toggleTodoDialog}/>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    todos: state.todos,
    dialogData: state.todoDialog,
    filters: state.todoFilter,
    tags: state.tags
});

const mapDispathToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispathToProps
)(App);

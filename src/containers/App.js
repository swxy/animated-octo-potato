import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import MainSection from '../components/MainSection';
import TodoDialog from '../components/TodoDialog';
import * as TodoActions from '../actions';

const App = ({todos, dialogData, actions}) => (
    <div className="page-wrapper">
        <Navigation/>
        <MainSection todos={todos} actions={actions} toggleTodoDialog={actions.toggleTodoDialog}/>
        <TodoDialog
            onEdit={actions.editTodo}
            onSave={actions.addTodo}
            visible={dialogData.visible}
            todo={dialogData.todo}
            toggleTodoDialog={actions.toggleTodoDialog}/>
    </div>
);

App.propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    todos: state.todos,
    dialogData: state.todoDialog
});

const mapDispathToProps = dispath => ({
    actions: bindActionCreators(TodoActions, dispath)
});

export default connect(
    mapStateToProps,
    mapDispathToProps
)(App);

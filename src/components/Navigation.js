import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Navigation extends Component {
    static propTypes = {
        current: PropTypes.string
    };

    state = {
        current: this.props.current || 'todo'
    };

    handleMenuClick (e) {
        // click
    }

    render () {
        return (
            <header className="page-header">
                <Menu className="page-header-menu" onClick={this.handleMenuClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal">
                    <Menu.Item key="todo">
                        <Icon type="file-text" />Todos
                    </Menu.Item>
                </Menu>
            </header>
        )
    }
}
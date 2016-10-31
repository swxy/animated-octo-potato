import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import * as MenuItemType from '../constants/NavigationTypes';

export default class Navigation extends Component {
    static propTypes = {
        current: PropTypes.string,
        switchMenu: PropTypes.func.isRequired
    };

    state = {
        current: this.props.current
    };

    handleMenuClick (e) {
        this.setState({
            current: e.key,
        });
        this.props.switchMenu(e.key);
    }

    render () {
        const menuItem = [];
        for (let key in MenuItemType) {
            menuItem.push(
                <Menu.Item key={MenuItemType[key]}>
                    <Icon type="file-text" />{key}
                </Menu.Item>
            )
        }
        return (
            <header className="page-header">
                <Menu className="page-header-menu" onClick={this.handleMenuClick.bind(this)}
                    selectedKeys={[this.state.current]}
                    mode="horizontal">
                    {menuItem}
                </Menu>
            </header>
        )
    }
}
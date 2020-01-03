import React, { Component } from "react";
import { Menu, Dropdown, Button, Icon } from "antd";
import { GetNamespaces } from "./ajax";

class NamespacesDropdown extends Component {
  constructor(props) {
    super(props);

    this.renderDropdown = this.renderDropdown.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.state = {
      namespaces: []
    };
  }

  componentDidMount() {
    GetNamespaces().then(data => {
      data.forEach(item => {
        const namespaces = this.state.namespaces;
        namespaces.push(item.name);
        this.setState({ namespaces: namespaces });
      });
    });
  }

  handleMenuClick(e) {
    this.props.setNamespace(e.item.props.children);
  }

  renderDropdown() {
    return (
      <Menu onClick={this.handleMenuClick}>
        {this.state.namespaces.map((item, index) => {
          return <Menu.Item key={index}>{item}</Menu.Item>;
        })}
      </Menu>
    );
  }

  render() {
    return (
      <div id="components-dropdown-demo-dropdown-button">
        <Dropdown overlay={this.renderDropdown()}>
          <Button>
            {this.props.selectedNamespace}
            <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default NamespacesDropdown;

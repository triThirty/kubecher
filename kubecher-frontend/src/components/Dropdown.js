import React, { Component } from "react";
import { Menu, Dropdown, Button, Icon, message } from "antd";
import { GetNamespaces } from "./ajax";

function handleMenuClick(e) {
  message.info("Click on menu item.");
  console.log("click", e);
}

class NamespacesDropdown extends Component {
  constructor(props) {
    super(props);

    this.renderDropdown = this.renderDropdown.bind(this);
    this.state = {
      namespaces: []
    };
  }

  renderDropdown() {
    console.log("render Dropdown");
    return (
      <Menu onClick={handleMenuClick}>
        {this.state.namespaces.map((item, index) => {
          console.log(this.state.namespaces);
          return <Menu.Item key={index}>{item}</Menu.Item>;
        })}
      </Menu>
    );
  }

  componentDidMount() {
    GetNamespaces().then(data => {
      data.forEach(item => {
        const namespaces = this.state.namespaces;
        namespaces.push(item.Name);
        this.setState({ namespaces: namespaces });
      });
    });
  }

  render() {
    console.log("render");
    return (
      <div id="components-dropdown-demo-dropdown-button">
        <Dropdown overlay={this.renderDropdown()}>
          <Button>
            {this.state.Namespace?this.state.Namespace[0]:""} <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default NamespacesDropdown;

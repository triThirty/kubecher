import React, { Component } from "react";
import { Menu, Dropdown, Button, Icon, message } from "antd";

function handleMenuClick(e) {
  message.info("Click on menu item.");
  console.log("click", e);
}

class NamespacesDropdown extends Component {
  constructor(props) {
    this.renderDropdown = this.renderDropdown.bind(this);

    super(props);
    this.state = {
      namespaces: []
    };
  }

  renderDropdown() {
    retrun(
      <Menu onClick={handleMenuClick}>
        {
          for (let [index, val] of this.state.namespaces.entries()) {
            console.log(index, val);
          }
        }
        {/* <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item> */}
      </Menu>
    );
  }

  componentDidMount() {
    // this.fetch();
    fetch("/api/namespace")
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        data.forEach(item => {
          const namespaces = this.state.namespaces;
          namespaces.push(item.Name);
          this.setState({ namespaces: namespaces });
        });
      });
  }

  render() {
    return (
      <div id="components-dropdown-demo-dropdown-button">
        <Dropdown overlay={menu}>
          <Button>
            Button <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default NamespacesDropdown;

import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

import NamespacesDropdown from "./tricks/Dropdown";
import { GetPodsByNamespaces, GetDeploymentByNamespace } from "./tricks/ajax";

import PodTable from "./k8sResource/PodTable";
import DeploymentTable from "./k8sResource/DeploymentTable";

const { Header, Content, Footer, Sider } = Layout;

class KubecherLayout extends Component {
  constructor(props) {
    super(props);

    this.setNamespace = this.setNamespace.bind(this);
    this.queryData = this.queryData.bind(this);
    this.MenuItemClicked = this.MenuItemClicked.bind(this);
    this.state = {
      namespace: "default",
      selectedMenuItem: "Pods",
      data: [],
      currentSelectedMenuItem: "1"
    };
  }
  componentDidMount() {
    this.queryData();
    window.location.href = "/#/Pods";
  }

  setNamespace(namespace) {
    this.setState({ namespace: namespace }, () => {
      this.queryData();
    });
  }

  queryData() {
    const resourceName = this.state.selectedMenuItem;
    switch (resourceName) {
      case "Pods":
        GetPodsByNamespaces(this.state.namespace).then(data => {
          this.setState({ data: data });
        });
        break;
      case "Secrets":
        console.log(resourceName);
        break;
      case "Configmap":
        console.log(resourceName);
        break;
      case "Deployment":
        GetDeploymentByNamespace(this.state.namespace, "").then(data => {
          this.setState({ data: data });
        });
        break;
      case "StatefulSet":
        console.log(resourceName);
        break;
      default:
        break;
    }
  }

  MenuItemClicked(menu) {
    const selectedMenuItem = menu.item.props.children.props.children;
    const selectedMenuItemKey = menu.key;
    this.setState(
      {
        selectedMenuItem: selectedMenuItem,
        currentSelectedMenuItem: selectedMenuItemKey,
        data: []
      },
      () => {
        this.queryData();
      }
    );
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <NamespacesDropdown
            setNamespace={this.setNamespace}
            selectedNamespace={this.state.namespace}
          />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Layout style={{ padding: "24px 0", background: "#fff" }}>
            <Router>
              <Sider width={200} style={{ background: "#fff" }}>
                <Menu
                  mode="inline"
                  style={{ height: "100%" }}
                  selectedKeys={[this.state.currentSelectedMenuItem]}
                  onClick={this.MenuItemClicked}
                >
                  <Menu.Item key="1">
                    <NavLink to="Pods">Pods</NavLink>
                  </Menu.Item>
                  <Menu.Item key="2">Secrets</Menu.Item>
                  <Menu.Item key="3">Configmap</Menu.Item>
                  <Menu.Item key="4">
                    <NavLink to="Deployment">Deployment</NavLink>
                  </Menu.Item>
                  <Menu.Item key="5">StatefulSet</Menu.Item>
                </Menu>
              </Sider>
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                <Route path="/Pods">
                  <PodTable PodData={this.state.data} />
                </Route>
                <Route path="/Deployment">
                  <DeploymentTable
                    DeploymentData={this.state.data}
                    Namespace={this.state.namespace}
                  />
                </Route>
              </Content>
            </Router>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>Text</Footer>
      </Layout>
    );
  }
}

export default KubecherLayout;

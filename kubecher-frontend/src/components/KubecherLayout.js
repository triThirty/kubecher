import React, { Component } from "react";
import { Layout, Menu } from "antd";

import NamespacesDropdown from "./Dropdown";
import { GetPodsByNamespaces, GetDeploymentByNamespaces } from "./ajax";

import PodTable from "./PodTable";
import DeploymentTable from "./DeploymentTable";

const { Header, Content, Footer, Sider } = Layout;

class KubecherLayout extends Component {
  constructor(props) {
    super(props);

    this.setNamespace = this.setNamespace.bind(this);
    this.MenuSelected = this.MenuSelected.bind(this);
    this.queryData = this.queryData.bind(this);
    this.state = {
      namespace: "default",
      selectedMenuItem: "Pods",
      data: []
    };
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
        // GetPodsByNamespaces(this.state.namespace).then(data => {
        //   this.setState({ data: data });
        // });

        GetDeploymentByNamespaces(this.state.namespace).then(data => {
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
        console.log(resourceName);
        break;
      case "StatefulSet":
        console.log(resourceName);
        break;
      default:
        break;
    }
  }

  MenuSelected(menu) {
    const selectedMenuItem = menu.item.props.children;
    this.setState({ selectedMenuItem: selectedMenuItem }, () => {
      this.queryData();
    });
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
            <Sider width={200} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                style={{ height: "100%" }}
                defaultSelectedKeys={["1"]}
                onSelect={this.MenuSelected}
              >
                <Menu.Item key="1">Pods</Menu.Item>
                <Menu.Item key="2">Secrets</Menu.Item>
                <Menu.Item key="3">Configmap</Menu.Item>
                <Menu.Item key="4">Deployment</Menu.Item>
                <Menu.Item key="5">StatefulSet</Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {/* <PodTable PodData={this.state.data} /> */}
              <DeploymentTable DeploymentData={this.state.data} />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>Text</Footer>
      </Layout>
    );
  }
}

export default KubecherLayout;

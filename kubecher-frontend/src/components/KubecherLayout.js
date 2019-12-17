import React, { Component } from "react";
import { Layout, Menu } from "antd";

import NamespacesDropdown from "./Dropdown";

const { Header, Content, Footer, Sider } = Layout;

class KubecherLayout extends Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <NamespacesDropdown />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Layout style={{ padding: "24px 0", background: "#fff" }}>
            <Sider width={200} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <Menu.Item key="1">Pods</Menu.Item>
                <Menu.Item key="2">Secrets</Menu.Item>
                <Menu.Item key="3">Configmap</Menu.Item>
                <Menu.Item key="4">Deployment</Menu.Item>
                <Menu.Item key="5">StatefulSet</Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              Content
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>Text</Footer>
      </Layout>
    );
  }
}

export default KubecherLayout;
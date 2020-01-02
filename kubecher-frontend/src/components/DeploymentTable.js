import { Table, Tag, Button } from "antd";
import React from "react";

import ReactJsonView from "./JsonPanel";
import YamlModal from "./YamlModal";

import yaml from "js-yaml";

class DeploymentTable extends React.Component {
  constructor(props) {
    super(props);
    this.expandedRowRender = this.expandedRowRender.bind(this);
    this.editYaml = this.editYaml.bind(this);
    this.switchYamlFormVisible = this.switchYamlFormVisible.bind(this);
    this.state = {
      yamlDate: "",
      EditFormShow: false
    };
  }

  editYaml(index) {
    this.setState({
      EditFormShow: true,
      yamlData: yaml.dump(this.props.DeploymentData[index], 4, 4)
    });
  }

  switchYamlFormVisible() {
    this.setState({ EditFormShow: this.state.EditFormShow ? false : true });
  }

  expandedRowRender(record, index, indent, expanded) {
    return <ReactJsonView Data={this.props.DeploymentData[index].spec} />;
  }

  renderTable(DeploymentData) {
    const data = [];
    DeploymentData.forEach((item, index, array) => {
      var labels = [];
      for (let k in item.spec.selector.matchLabels) {
        labels.push(
          <Tag
            style={{ marginTop: 9 }}
            color="gray"
            key={k}
          >{`${k} = ${item.spec.selector.matchLabels[k]}`}</Tag>
        );
      }
      data.push({
        key: index,
        name: item.metadata.name,
        ready: `${item.status.availableReplicas}/${item.status.replicas}`,
        labels: labels,
        creationTimestamp: item.metadata.creationTimestamp
      });
    });
    return data;
  }

  render() {
    const columns = [
      { title: "名称", dataIndex: "name", key: "name" },
      { title: "Ready", dataIndex: "ready", key: "ready" },
      {
        title: "Selector",
        dataIndex: "labels",
        key: "labels",
        width: 600
      },
      {
        title: "创建时间",
        dataIndex: "creationTimestamp",
        key: "creationTimestamp"
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (text, row, index) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.editYaml(index);
              }}
            >
              编辑
            </Button>
          );
        }
      }
    ];
    return (
      <div>
        <YamlModal
          show={this.state.EditFormShow}
          switchYamlFormVisible={this.switchYamlFormVisible}
          yamlData={this.state.yamlData}
        />
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandedRowRender={this.expandedRowRender}
          dataSource={this.renderTable(this.props.DeploymentData)}
        />
      </div>
    );
  }
}
export default DeploymentTable;

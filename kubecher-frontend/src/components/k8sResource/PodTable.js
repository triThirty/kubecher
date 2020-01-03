import { Table } from "antd";
import React from "react";

import ReactJsonView from "../tricks/JsonPanel";

class PodTable extends React.Component {
  constructor(props) {
    super(props);
    this.expandedRowRender = this.expandedRowRender.bind(this);
  }
  expandedRowRender(record, index, indent, expanded) {
    return <ReactJsonView Data={this.props.PodData[index].spec} />;
  }

  renderTable(PodData) {
    const data = [];
    PodData.forEach((item, index, array) => {
      data.push({
        key: index,
        status: item.status.phase,
        name: item.metadata.name,
        ip: item.status.podIP,
        nodeName: item.spec.nodeName,
        creationTimestamp: item.metadata.creationTimestamp
      });
    });
    return data;
  }

  render() {
    const columns = [
      { title: "状态", dataIndex: "status", key: "status" },
      { title: "名称", dataIndex: "name", key: "name" },
      { title: "IP", dataIndex: "ip", key: "ip" },
      { title: "主机", dataIndex: "nodeName", key: "nodeName" },
      {
        title: "创建时间",
        dataIndex: "creationTimestamp",
        key: "creationTimestamp"
      }
    ];
    return (
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandedRowRender={this.expandedRowRender}
        dataSource={this.renderTable(this.props.PodData)}
      />
    );
  }
}
export default PodTable;

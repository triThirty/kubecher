import { Table } from "antd";
import React from "react";

// import ReactJsonView from "../tricks/JsonPanel";
import DescribePanel from "../tricks/DescribePanel";

import { GetDescribePodByNamespace } from "../tricks/ajax";

class PodTable extends React.Component {
  constructor(props) {
    super(props);
    this.expandedRowRender = this.expandedRowRender.bind(this);
    this.onExpand = this.onExpand.bind(this);

    this.state = {
      describeData: {}
    };
  }
  expandedRowRender(record, index, indent, expanded) {
    // return <ReactJsonView Data={this.props.PodData[index].spec} />;
    return <DescribePanel DescribeData={this.state.describeData[index]} />;
  }

  onExpand(expanded, record) {
    // console.log(this.props.Namespace, record["name"]);
    GetDescribePodByNamespace(this.props.Namespace, record["name"]).then(
      data => {
        this.setState({
          describeData: { ...this.state.describeData, [record.key]: data }
        });
      }
    );
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
        onExpand={this.onExpand}
        expandedRowRender={this.expandedRowRender}
        dataSource={this.renderTable(this.props.PodData)}
      />
    );
  }
}
export default PodTable;

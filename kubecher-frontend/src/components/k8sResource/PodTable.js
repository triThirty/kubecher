import { Table, Button } from "antd";
import React from "react";

// import ReactJsonView from "../tricks/JsonPanel";
import DescribePanel from "../tricks/DescribePanel";
import LogModal from "../tricks/LogModal";

import {
  GetDescribePodByNamespace,
  GetLogsPodByNamespace
} from "../tricks/ajax";

class PodTable extends React.Component {
  constructor(props) {
    super(props);
    this.expandedRowRender = this.expandedRowRender.bind(this);
    this.switchLogFormVisible = this.switchLogFormVisible.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.checkLogs = this.checkLogs.bind(this);

    this.state = {
      describeData: {},
      EditFormShow: false,
      logData: ""
    };
  }
  expandedRowRender(record, index, indent, expanded) {
    return <DescribePanel DescribeData={this.state.describeData[index]} />;
  }

  switchLogFormVisible() {
    this.setState({ EditFormShow: this.state.EditFormShow ? false : true });
  }

  onExpand(expanded, record) {
    GetDescribePodByNamespace(this.props.Namespace, record["name"]).then(
      data => {
        this.setState({
          describeData: { ...this.state.describeData, [record.key]: data }
        });
      }
    );
  }

  checkLogs(index) {
    const metadata = this.props.PodData[index].metadata;
    GetLogsPodByNamespace(metadata.namespace, metadata.name).then(data => {
      this.setState({
        EditFormShow: true,
        logData: data
      });
    });
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
                this.checkLogs(index);
              }}
            >
              查看日志
            </Button>
          );
        }
      }
    ];
    return (
      <div>
        <LogModal
          show={this.state.EditFormShow}
          switchLogFormVisible={this.switchLogFormVisible}
          logData={this.state.logData}
        />
        <Table
          className="components-table-demo-nested"
          columns={columns}
          onExpand={this.onExpand}
          expandedRowRender={this.expandedRowRender}
          dataSource={this.renderTable(this.props.PodData)}
        />
      </div>
    );
  }
}
export default PodTable;

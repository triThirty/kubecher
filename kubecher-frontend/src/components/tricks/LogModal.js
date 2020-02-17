import { Modal } from "antd";
import React from "react";
import LogEditor from "./LogEditor";

class LogModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = { log: "" };
  }

  componentDidMount() {
    console.log(this.props.logData);
    this.setState({ log: this.props.logData });
  }

  handleCancel(e) {
    this.props.switchLogFormVisible();
  }

  render() {
    return (
      <div>
        <Modal
          style={{ top: 10 }}
          title="Log"
          visible={this.props.show}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          closable={false}
          width="full"
        >
          <LogEditor logData={this.props.logData} />
        </Modal>
      </div>
    );
  }
}

export default LogModal;

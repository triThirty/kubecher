import { Modal } from "antd";
import React from "react";

class YamlForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    this.setState({
      visible: true
    });
  }

  handleOk(e) {
    console.log(e);
    this.setState({
      visible: false
    });
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default YamlForm;

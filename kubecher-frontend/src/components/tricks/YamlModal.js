import { Modal } from "antd";
import React from "react";

import YamlEditor from "./YamlEditor";

class YamlModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onYamlChange = this.onYamlChange.bind(this);
    this.state = { yaml: "" };
  }

  componentDidMount() {
    this.setState({ yaml: this.props.yamlData });
  }

  onYamlChange(yamlData) {
    this.setState({ yaml: yamlData });
  }

  handleOk(e) {
    this.setState({ yaml: this.props.yamlData });
  }

  handleCancel(e) {
    this.props.switchYamlFormVisible();
    this.setState({ yaml: "" });
  }

  render() {
    return (
      <div>
        <Modal
          style={{ top: 10 }}
          title="Yaml"
          visible={this.props.show}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          closable={false}
          width="full"
        >
          <YamlEditor
            yamlData={this.props.yamlData}
            codeUpdate={this.onYamlChange}
          />
        </Modal>
      </div>
    );
  }
}

export default YamlModal;

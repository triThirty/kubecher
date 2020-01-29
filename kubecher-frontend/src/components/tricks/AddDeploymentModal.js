import { Modal, message } from "antd";
import React from "react";

import AddDeploymentTabs from "./AddDeploymentTabs";
import { PostDeploymentByYAML } from "./ajax";

import yaml from "js-yaml";

class AddDeploymentModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onYamlChange = this.onYamlChange.bind(this);
    this.state = { yaml: "" };
  }


  onYamlChange(yamlData) {
    this.setState({ yaml: yamlData });
  }


  handleOk(e) {
    try {
      let jsonObj = yaml.load(this.state.yaml)
      if (jsonObj.kind !== "Deployment" || jsonObj.metadata.namespace !== this.props.Namespace) {
        if (jsonObj.kind !== "Deployment") {
          message.error(`当前YAML创建资源为${jsonObj.kind}，不为'Deployment'！`, 10);
        } else if (jsonObj.metadata.namespace !== this.props.Namespace) {
          message.error(`当前YAML创建资源的Namespace为'${jsonObj.metadata.namespace}'，不为'${this.props.Namespace}'！`, 10);
        }
        return null
      }
      let jsonString = JSON.stringify(jsonObj, null, 2);
      PostDeploymentByYAML(jsonString)
      // console.log(jsonObj.kind, jsonObj.metadata.namespace)
    } catch (e) {
      message.error(e.message);
    }

  }

  handleCancel(e) {
    this.props.switchAddFormVisible();
    this.setState({ yaml: "" });
  }

  render() {
    return (
      <Modal
        className="add-deployment-modal"
        style={{ top: 10 }}
        title="Yaml"
        visible={this.props.show}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        closable={false}
        width="full"
      >
        <AddDeploymentTabs yamlData={this.state.yaml} onYamlChange={this.onYamlChange} />
      </Modal>
    );
  }
}

export default AddDeploymentModal;

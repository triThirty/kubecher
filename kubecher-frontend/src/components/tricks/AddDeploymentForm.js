import React from "react";
import { Form, Input } from "antd";

class AddDeploymentForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Form.Item label="AppName">
                    {getFieldDecorator('appname', {
                        rules: [
                            {
                                required: true,
                                message: '请输入App名称',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Version">
                    {getFieldDecorator('version', {
                        rules: [
                            {
                                required: true,
                                message: '版本',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="副本数">
                    {getFieldDecorator('replicas', {
                        rules: [
                            {
                                type: 'integer',
                                message: '请输入副本数！',
                            },
                            {
                                required: true,
                                message: '副本数',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="镜像">
                    {getFieldDecorator('image', {
                        rules: [
                            {
                                required: true,
                                message: 'NameSpace',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>

            </Form>

        );
    }
}

const AddDeploymentFormInstance = Form.create({ name: 'AddDeploymentForm' })(AddDeploymentForm);

export default AddDeploymentFormInstance;

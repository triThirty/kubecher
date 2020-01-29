
import React from "react";
import { Tabs, Icon } from 'antd';
import YamlEditor from "./YamlEditor";
const { TabPane } = Tabs;



class AddDeploymentTabs extends React.Component {
    render() {
        return (
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <Icon type="file-text" />
                            YAML
            </span>
                    }
                    key="1"
                >
                    <YamlEditor yamlData={this.props.yamlData} codeUpdate={this.props.onYamlChange} />
                </TabPane>
            </Tabs>
        );
    }
}

export default AddDeploymentTabs;

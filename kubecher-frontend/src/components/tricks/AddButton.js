import React from "react";
import { Button } from "antd";

class AddButton extends React.Component {
  render() {
    return (
        <Button style={{ margin:7 }} onClick={()=>this.props.Action()} type="primary" icon="plus" size="large">
            {this.props.Name}
        </Button> 

    );
  }
}

export default AddButton;

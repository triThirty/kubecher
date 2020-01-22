import React from "react";

import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";

class DescribePanel extends React.Component {
  render() {
    return (
      <div className="DesribeCodeMirror">
        <CodeMirror
          value={this.props.DescribeData}
          options={{
            readOnly: true,
            theme: "monokai",
            mode: "text",
            lineNumbers: true,
            lineWrapping: true
          }}
        />
      </div>
    );
  }
}

export default DescribePanel;

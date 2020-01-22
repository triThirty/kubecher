import React from "react";

import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";

class DescribePanel extends React.Component {
  render() {
    return (
      <CodeMirror
        value={this.props.DescribeData}
        height="100%"
        options={{
          readOnly: true,
          theme: "monokai",
          mode: "text",
          lineNumbers: true,
          lineWrapping: true
        }}
      />
    );
  }
}

export default DescribePanel;

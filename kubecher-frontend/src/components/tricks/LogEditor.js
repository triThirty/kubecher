import React from "react";

import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";

class LogEditor extends React.Component {
  render() {
    return (
      <CodeMirror
        className={this.props.className}
        value={this.props.logData}
        options={{
          theme: "monokai",
          keyMap: "sublime",
          mode: "log",
          lineNumbers: true,
          lineWrapping: true
        }}
      />
    );
  }
}

export default LogEditor;

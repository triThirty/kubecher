import React from "react";

import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";

class YamlEditor extends React.Component {
  constructor(props) {
    super(props);
    this.updateCode = this.updateCode.bind(this);
  }

  updateCode(editor, value) {
    this.props.codeUpdate(editor.getValue());
  }

  render() {
    return (
      <CodeMirror
        value={this.props.yamlData}
        options={{
          theme: "monokai",
          keyMap: "sublime",
          mode: "yaml",
          lineNumbers: true,
          lineWrapping: true
        }}
        onChange={this.updateCode}
      />
    );
  }
}

export default YamlEditor;

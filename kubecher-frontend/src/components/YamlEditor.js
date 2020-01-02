import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";

class YamlEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yaml: ""
    };
  }

  componentDidMount() {
    console.log(this.props.yamlData);
    this.setState({ yaml: this.props.yamlData });
  }

  render() {
    return (
      <CodeMirror
        value={this.state.yaml}
        options={{
          theme: "monokai",
          keyMap: "sublime",
          mode: "yaml",
          lineNumbers: true,
          lineWrapping: true
        }}
      />
    );
  }
}

export default YamlEditor;

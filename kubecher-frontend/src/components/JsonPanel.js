import React from "react";

import ReactJson from "react-json-view";

class ReactJsonView extends React.Component {
  render() {
    return (
      <ReactJson
        src={this.props.Data}
        enableClipboard={false}
        theme="monokai"
        displayDataTypes={false}
        displayObjectSize={false}
      />
    );
  }
}
export default ReactJsonView;

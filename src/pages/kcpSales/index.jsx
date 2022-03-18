import React, { Component } from "react";

export default class index extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.history.push("/kcpSales/form");
          }}
        >
          报名
        </button>
      </div>
    );
  }
}

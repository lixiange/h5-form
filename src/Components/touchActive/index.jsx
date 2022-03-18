import React, { Component } from "react";
import "./style.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  touchActive = active => {
    this.setState({
      active
    });
  };
  render() {
    const { style, className } = this.props;
    const { active } = this.state;
    return (
      <div
        style={style}
        className={`${className} ${active ? "active" : ""} touch-active`}
        onTouchStart={() => {
          this.touchActive(true);
        }}
        onTouchEnd={() => {
          this.touchActive(false);
        }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

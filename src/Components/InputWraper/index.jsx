import React, { Component } from "react";
import "./index.scss";

export default class FormInput extends Component {
  render() {
    const { v_model, placeholder, prompt, context } = this.props;
    return (
      <div className="inputWraper">
        <div className="innerWraper">
          {this.props.children}
          <div
            className={
              context.upMove[v_model] ? "up_placeholder" : "nor_placeholder"
            }
          >
            {placeholder}
          </div>
        </div>

        <div className="message">
          <div className="messagebefore">
            {prompt ? "(" + prompt + ")" : null}
          </div>
          {context.error[v_model] ? (
            <div className="messageafter"> {context.error[v_model]}</div>
          ) : null}
        </div>
      </div>
    );
  }
}

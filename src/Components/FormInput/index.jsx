import React, { Component } from "react";
import { ThemeContext } from "../Form";
import { InputItem } from "antd-mobile";
import InputWraper from "../InputWraper";
import "./index.scss";

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { validate, v_model } = this.props;
    const { pushValidate } = this.context;
    if (pushValidate && validate) {
      pushValidate(v_model, validate);
    }
  }

  onInput = (event) => {
    const { changeModel } = this.context;
    const { v_model } = this.props;
    changeModel(v_model, event);
  };

  onBlur = (event) => {
    const { changeUpmove, validateFunc } = this.context;
    const { v_model } = this.props;
    if (event) {
      validateFunc(event, v_model);
    } else {
      validateFunc(event, v_model);
      changeUpmove(v_model, false);
    }
  };
  clickInput = () => {
    const { v_model } = this.props;
    const { changeUpmove } = this.context;
    changeUpmove(v_model, true);
  };

  static contextType = ThemeContext;
  render() {
    let context = this.context;
    const { v_model, maxLength, type } = this.props;
    return (
      <InputWraper context={context} {...this.props}>
        <InputItem
          className="inputStyle"
          maxLength={maxLength ? maxLength : 20}
          value={context.model[v_model]}
          type={type ? type : "text"}
          onChange={this.onInput}
          onBlur={this.onBlur}
          onFocus={this.clickInput}
        />
      </InputWraper>
    );
  }
}

import React, { Component } from "react";
import { ThemeContext } from "../Form";
import CheckSelector from "../checkSelector";
import SelfSelector from "../selfSelector";
import InputWraper from "../InputWraper";
import "./index.scss";

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isshow: false,
      content: "",
    };
  }

  componentDidMount() {
    const { validate, v_model } = this.props;
    const { pushValidate } = this.context;
    if (pushValidate && validate) {
      pushValidate(v_model, validate);
    }
  }

  validateFunc = (value) => {
    const { validateToRules, changeError } = this.context;
    const { v_model, validate } = this.props;
    if (validate) {
      const validataArr = validateToRules(validate);
      let message = "";
      validataArr.some((v) => {
        if (v(value) && v(value).error) {
          message = v(value).message;
          return true;
        }
      });
      changeError(v_model, message);
    }
  };

  selfselectcentain = (data) => {
    const { changeUpmove, changeModel, validateFunc } = this.context;
    const { v_model } = this.props;
    console.log(data);
    changeModel(v_model, data);
    changeUpmove(v_model, Boolean(data));
    this.setState({
      isshow: false,
    });
    validateFunc(data, v_model);
  };
  selectcentain = (content, value) => {
    // content用来记录历史
    const { changeUpmove, changeModel, validateFunc } = this.context;
    const { v_model } = this.props;
    this.setState({
      content,
      isshow: false,
    });
    changeModel(v_model, value);
    changeUpmove(v_model, Boolean(value));
    validateFunc(value, v_model);
  };
  Cancel = () => {
    this.setState({
      isshow: false,
    });
  };

  static contextType = ThemeContext;
  render() {
    let context = this.context;
    const { v_model, proList } = this.props;
    const { isshow, content } = this.state;
    return (
      <InputWraper context={context} {...this.props}>
        {v_model === "willingCategory" ? (
          <div
            className="inner_content"
            onClick={() => {
              this.setState({ isshow: true });
            }}
          >
            {content}
          </div>
        ) : (
          <div
            className="inner_content"
            onClick={() => {
              this.setState({ isshow: true });
            }}
          >
            {context.model[v_model]}
          </div>
        )}
        {isshow && v_model === "willingCategory" ? (
          <CheckSelector
            value={content}
            onCentain={this.selectcentain}
            onCancel={this.Cancel}
            selector={proList}
          ></CheckSelector>
        ) : null}
        {isshow && v_model === "dept" ? (
          <SelfSelector
            value={context.model[v_model]}
            selector={proList}
            onSelfCentain={this.selfselectcentain}
            onCancel={this.Cancel}
          ></SelfSelector>
        ) : null}
      </InputWraper>
    );
  }
}

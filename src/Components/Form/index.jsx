import React, { Component } from "react";
import { Toast } from "antd-mobile";
import TouchActive from "../touchActive";
import cloneDeep from "lodash/cloneDeep";
import { validateToRules } from "../../utils/validate";
import "./index.scss";

export const ThemeContext = React.createContext();

export default class FormWraper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      model: {},
      error: {},
      upMove: {},
      validateList: {},
      checked: false,
    };
  }

  componentDidMount() {
    const { model } = cloneDeep(this.state);
    const { modellist } = this.props;
    console.log(modellist);
    modellist.forEach((v) => {
      model[v] = "";
    });
    this.setState({
      model,
    });
  }

  // componentDidUpdate(preProps) {
  //   console.log("更新了");
  //   const { model, upMove } = cloneDeep(this.state);
  //   const { historyData, modellist } = this.props;
  //   if (preProps.historyData !== historyData) {
  //     modellist.forEach((v) => {
  //       if (historyData[v]) {
  //         model[v] = historyData[v];
  //         upMove[v] = true;
  //       } else {
  //         model[v] = "";
  //       }
  //     });
  //     this.setState({
  //       model,
  //       upMove,
  //     });
  //   }
  // }

  // 校验规则
  validateFunc = (value, v_model) => {
    const { validateList } = this.state;
    if (validateList[v_model]) {
      const validataArr = validateToRules(validateList[v_model]);
      let message = "";
      validataArr.some((v) => {
        if (v(value) && v(value).error) {
          message = v(value).message;
          return true;
        }
      });
      this.changeError(v_model, message);
    }
  };

  pushValidate = (name, value) => {
    const { validateList } = this.state;
    validateList[name] = value;
    this.setState({
      validateList,
    });
  };

  changeError = (name, value) => {
    const { error } = cloneDeep(this.state);
    error[name] = value;
    this.setState({
      error,
    });
  };

  changeUpmove = (name, value) => {
    const upMove = cloneDeep(this.state.upMove);
    upMove[name] = value;
    this.setState({
      upMove,
    });
  };

  changeModel = (name, value) => {
    const { model } = cloneDeep(this.state);
    model[name] = value;
    this.setState({
      model,
    });
  };
  // 提交时校验
  submitValidate = () => {
    const { model, error, validateList } = cloneDeep(this.state);
    const newArr = Object.entries(model);
    let isAllRight = true;
    newArr.forEach((v) => {
      if (validateList[v[0]]) {
        const validataArr = validateToRules(validateList[v[0]]);
        validataArr.some((tar) => {
          if (tar(v[1]) && tar(v[1]).error) {
            isAllRight = false;
            error[v[0]] = tar(v[1]).message;
            return true;
          }
        });
      }
    });
    this.setState({
      error,
    });
    return isAllRight;
  };

  onSubmit = () => {
    const { hasagreement, submit } = this.props;
    const { checked } = this.state;
    if (hasagreement && !checked) {
      Toast.fail("请勾选协议", 1);
      return;
    }
    const data = this.submitValidate();

    if (data) {
      // console.log("全部表单校验通过");
      submit(this.state.model);
    } else {
      // console.log("有表单校验未通过");
    }
  };

  changeStatus = () => {
    let checked = this.state.checked;
    this.setState({
      checked: !checked,
    });
  };

  render() {
    const { model, error, upMove, checked } = this.state;
    const { buttonName, hasagreement } = this.props;
    return (
      <div className="formWraper">
        <ThemeContext.Provider
          value={{
            model: model,
            changeModel: this.changeModel,
            validateToRules,
            changeError: this.changeError,
            error: error,
            upMove: upMove,
            changeUpmove: this.changeUpmove,
            pushValidate: this.pushValidate,
            validateFunc: this.validateFunc,
          }}
        >
          {this.props.children}
          {hasagreement ? (
            <div className="checkbox_title">
              <div onClick={this.changeStatus} className="checkbox">
                {checked ? (
                  <img
                    className="checkbox_img"
                    src={require("../../static/images/selected.png")}
                    alt=""
                  />
                ) : (
                  <img
                    className="checkbox_img"
                    src={require("../../static/images/select.png")}
                    alt=""
                  />
                )}
              </div>
              <div className="title">
                本人知悉并同意向该官微公众号提交相关数据和信息，并授权金佰利商业消费部使用本人提供的相关信息。
              </div>
            </div>
          ) : null}
          <TouchActive style={{ width: "100%" }}>
            <div
              className="submit"
              onClick={() => {
                this.onSubmit();
              }}
            >
              {buttonName}
            </div>
          </TouchActive>
        </ThemeContext.Provider>
      </div>
    );
  }
}

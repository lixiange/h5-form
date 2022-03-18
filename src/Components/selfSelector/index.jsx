import React, { Component } from "react";
import { InputItem, PickerView } from "antd-mobile";
import Modal from "../customModal";
import "./index.scss";

class Index extends Component {
  config = {
    navigationStyle: "custom",
  };
  constructor(props) {
    super(props);
    this.state = {
      inputvalue: [0],
      inputselector: [],
      textvalue: "",
      isshow: false,
    };
  }
  componentWillMount() {
    console.log(this.props);
    let { selector, value } = this.props;
    let { inputvalue, textvalue, isshow } = this.state;
    console.log(inputvalue);
    console.log(value);
    if (value) {
      inputvalue[0] = "其他";
      textvalue = value;
      isshow = true;
    }
    selector.forEach((v, i) => {
      console.log(v.value);
      if (v.value === value) {
        console.log(value);
        inputvalue[0] = value;
        textvalue = "";
        isshow = false;
      }
    });
    console.log(inputvalue);
    this.setState({
      inputselector: selector,
      textvalue,
      inputvalue: inputvalue,
      isshow,
    });
  }
  componentWillUnmount() {}

  onChange = (e) => {
    console.log(e);
    let { isshow } = this.state;
    if (e[0] === "其他") {
      isshow = true;
    } else {
      isshow = false;
    }

    this.setState({
      inputvalue: e,
      isshow,
    });
  };
  changinputvalue = (e) => {
    console.log(e);
    this.setState({
      textvalue: e,
    });
  };
  centain = () => {
    const { onSelfCentain } = this.props;
    const { textvalue, inputvalue, inputselector } = this.state;
    console.log(inputselector);
    console.log(inputvalue);
    console.log(textvalue);
    if (inputvalue[0] === "其他") {
      onSelfCentain(textvalue);
    } else {
      onSelfCentain(inputvalue[0]);
    }
  };
  cancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };
  stopPro = (e) => {
    e.stopPropagation();
  };
  render() {
    const { inputselector, textvalue, isshow, inputvalue } = this.state;
    console.log(inputselector);
    console.log(inputvalue);
    return (
      <Modal back={this.cancel}>
        <div className="self_inner" onClick={this.stopPro}>
          <PickerView
            value={inputvalue}
            cols={1}
            data={inputselector}
            indicatorStyle={{ height: "50px", textAlign: "center" }}
            itemStyle={{
              width: "100%",
              height: "50px",
              lineHeight: "50px",
              textAlign: "center",
            }}
            onChange={this.onChange}
          ></PickerView>

          {isshow ? (
            <div className="self_inputwraper">
              <InputItem
                value={textvalue}
                onChange={this.changinputvalue}
                className="input"
                placeholder="请输入您的部门"
              ></InputItem>
            </div>
          ) : (
            <div className="none"></div>
          )}

          <div className="self_bottom">
            <div className="cancel" onClick={this.cancel}>
              取消
            </div>
            <div className="centain" onClick={this.centain}>
              确定
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Index;

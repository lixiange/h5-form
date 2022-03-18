import React, { Component } from "react";
import { Picker } from "antd-mobile";
import { ThemeContext } from "../Form";
import InputWraper from "../InputWraper";
import "./index.scss";

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proList: [
        { value: "北京市", label: "北京市" },
        { value: "上海市", label: "上海市" },
        { value: "重庆市", label: "重庆市" },
        { value: "天津市", label: "天津市" },
        { value: "河南省", label: "河南省" },
        { value: "河北省", label: "河北省" },
        { value: "湖北省", label: "湖北省" },
        { value: "湖南省", label: "湖南省" },
        { value: "广东省", label: "广东省" },
        { value: "陕西省", label: "陕西省" },
        { value: "甘肃省", label: "甘肃省" },
        { value: "青海省", label: "青海省" },
        { value: "山西省", label: "山西省" },
        { value: "辽宁省", label: "辽宁省" },
        { value: "吉林省", label: "吉林省" },
        { value: "黑龙江省", label: "黑龙江省" },
        { value: "江苏省", label: "江苏省" },
        { value: "浙江省", label: "浙江省" },
        { value: "安徽省", label: "安徽省" },
        { value: "福建省", label: "福建省" },
        { value: "江西省", label: "江西省" },
        { value: "山东省", label: "山东省" },
        { value: "海南省", label: "海南省" },
        { value: "四川省", label: "四川省" },
        { value: "贵州省", label: "贵州省" },
        { value: "云南省", label: "云南省" },
        { value: "台湾省", label: "台湾省" },
        { value: "宁夏回族自治区", label: "宁夏回族自治区" },
        { value: "新疆维吾尔自治区", label: "新疆维吾尔自治区" },
        { value: "内蒙古自治区", label: "内蒙古自治区" },
        { value: "广西壮族自治区", label: "广西壮族自治区" },
        { value: "西藏自治区", label: "西藏自治区" },
        { value: "香港特别行政区", label: "香港特别行政区" },
        { value: "澳门特别行政区", label: "澳门特别行政区" },
      ],
      content: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { validate, v_model } = this.props;
    const { pushValidate } = this.context;
    if (pushValidate && validate) {
      pushValidate(v_model, validate);
    }
  }

  onChange = (e) => {
    const value = e;
    const { changeUpmove, changeModel, validateFunc } = this.context;
    const { v_model } = this.props;
    validateFunc(value[0], v_model);
    changeUpmove(v_model, true);
    changeModel(v_model, value[0]);
    this.setState({
      content: value,
    });
  };

  static contextType = ThemeContext;
  render() {
    let context = this.context;
    const { v_model } = this.props;
    const { proList, content } = this.state;
    return (
      <InputWraper context={context} {...this.props}>
        <Picker
          data={proList}
          cols={1}
          value={content}
          onChange={this.onChange}
        >
          <div className="picker">{context.model[v_model]}</div>
        </Picker>
      </InputWraper>
    );
  }
}

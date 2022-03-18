import React, { Component } from "react";

import FormWraper from "../../Components/Form";
import { request } from "../../request/api";
import FormInput from "../../Components/FormInput";
import FormProvince from "../../Components/FormProvinceSelect";
import home from "../../static/images/home.jpg";
import { GetQueryString } from "../../utils/util";
import "./index.scss";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      channelSourceList: [],
      positionList: [],
      historyData: [],
    };
  }

  componentWillMount() {
    // this.getData();
  }

  async submit(data) {
    console.log(data);
    const openid = GetQueryString("mpOpenId");
    console.log(openid);
    const { postForm } = request;
    let sublist = {};
    sublist.formContent = data;
    sublist.formVersion = 2;
    sublist.userId = openid;
    let res = await postForm(sublist);
    console.log(res);
  }

  // async getData() {
  //   try {
  //     let { categoryList, positionList } = request;
  //     let [getCategoryList, getPositionList] = await Promise.all([
  //       categoryList(),
  //       positionList(),
  //     ]);
  //     let newGetPositionList = getPositionList.data.map((v2) => {
  //       return { value: v2, label: v2 };
  //     });
  //     this.setState({
  //       categoryList: getCategoryList.data,
  //       positionList: newGetPositionList,
  //     });
  //   } catch (error) {
  //     if (error.message) {
  //       this.setState({
  //         toastText: error.message,
  //         isToastOpen: true,
  //       });
  //     } else {
  //       this.setState({
  //         toastText: "数据异常",
  //         isToastOpen: true,
  //       });
  //     }
  //   }
  // }

  render() {
    const { positionList, categoryList } = this.state;
    return (
      <div className="kcpSales">
        <img src={home} className="img" alt="" />
        <FormWraper
          hasagreement
          historyData={{}}
          modellist={["phone", "JobNumber", "userName"]}
          buttonName="提交并抽奖"
          submit={this.submit}
        >
          <FormInput
            v_model="JobNumber"
            placeholder="*工号"
            validate={["empty"]}
          />
          <FormInput
            v_model="userName"
            placeholder="*姓名"
            validate={["empty"]}
          />
          <FormInput
            v_model="phone"
            placeholder="*手机号"
            type="phone"
            validate={["phone", "empty"]}
            // prompt="需要微信校验"
          />
          <FormProvince
            v_model="province"
            placeholder="*省份"
            validate={["empty"]}
          />
        </FormWraper>
      </div>
    );
  }
}

export default Detail;

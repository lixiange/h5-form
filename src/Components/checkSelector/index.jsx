import React, { Component, Fragment } from "react";
import cloneDeep from "lodash/cloneDeep";
import Modal from "../customModal";

import "./index.scss";

class Index extends Component {
  config = {
    navigationStyle: "custom",
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    let data = cloneDeep(this.props.selector);
    let arr = this.props.value.split(";");
    if (data.length) {
      arr.forEach((v) => {
        data.forEach((v1) => {
          v1.children.forEach((v2) => {
            if (v2.name === v) {
              v2.selected = true;
            }
          });
        });
      });
      this.setState({
        data,
      });
    }
  }
  stopPro = (e) => {
    e.stopPropagation();
  };
  selected = (name, name1) => {
    let data = cloneDeep(this.state.data);
    data.forEach((v) => {
      if (v.name === name) {
        v.children.forEach((v2) => {
          if (v2.name === name1) {
            console.log(v2.selected);
            v2.selected = !v2.selected;
          }
        });
      }
    });
    this.setState({
      data: data,
    });
  };

  centain = () => {
    const { onCentain } = this.props;
    let arr = [];
    let idarr = [];
    this.state.data.forEach((v) => {
      v.children.forEach((v2) => {
        if (v2.selected === true) {
          arr.push(v2.name);
          idarr.push(v2.value);
        }
      });
    });
    onCentain(arr.join(";"), idarr.join(","));
  };
  cancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    const { data } = this.state;
    return (
      <Fragment>
        <Modal back={this.cancel}>
          <div className="inner" onClick={this.stopPro}>
            {data.map((v, i) => {
              return (
                <div className="inner_wrap" key={i}>
                  <div className="divider">
                    <div className="line"></div>
                    <div className="divider_writer">{v.name}</div>
                    <div className="line"></div>
                  </div>

                  <div className="angle_wrap">
                    {v.children.map((v1, i1) => {
                      return (
                        <div className="angle" key={i1}>
                          <div className="nonestyle">
                            <div
                              className={v1.selected ? "selectedstyle" : null}
                              onClick={this.selected.bind(
                                this,
                                v.name,
                                v1.name
                              )}
                            ></div>
                          </div>
                          <span
                            onClick={this.selected.bind(this, v.name, v1.name)}
                            className="text"
                          >
                            {v1.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className="checkselector_bottom">
              <div className="cancel" onClick={this.cancel}>
                取消
              </div>
              <div className="centain" onClick={this.centain}>
                确定
              </div>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default Index;

import React from "react";
import { connect } from "react-redux";

function Result(props) {
  const { hasSubscribe } = props;
  return (
    <div>
      {hasSubscribe ? <div>已关注公众号</div> : <div>未关注公众号</div>}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    hasSubscribe: state.get("hasSubscribe"),
  };
};
export default connect(mapStateToProps, null)(Result);

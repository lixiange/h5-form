import { fromJS, merge } from "immutable";
import * as constants from "./constants";
const defaultOption = fromJS({
  finishInit: false,
  hasSubscribe:false
});

function commonReducer(oldState = defaultOption, action) {
  let { type, data } = action;
  switch (type) {
    case constants.initData:
      return oldState.merge(fromJS(data));
    default:
      return oldState;
  }
}

export default commonReducer;

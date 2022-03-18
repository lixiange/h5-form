import {
  put,
  takeEvery,
  call,
  takeLeading,
  delay,
  takeLatest,
} from "redux-saga/effects";
import * as constants from "./constants";
import { initData } from "./actionCreators";
import { request } from "../request/api";
import { GetQueryString } from "../utils/util";
function* initApp(action) {
  const openid = GetQueryString("mpOpenId");
  const subscribe = GetQueryString("subscribe");
  // alert(window.location.href)
  const href = window.location;
  const origion = href.origin;
  const pathname = href.pathname;
  const search = href.search;
  if (!openid) {
    // window.location.href =
    //   "https://kcpapi.intcolon.com/kcp/api/1/wechat/mp/authorize?redirectUrl=" +
    //   encodeURIComponent(encodeURIComponent(origion + pathname + search));
    return;
  }
  localStorage.setItem(openidKey, openid);
  yield put(initData({ finishInit: true, hasSubscribe: subscribe === 1 }));
}
function* rootSaga() {
  yield takeEvery(constants.initApp, initApp);
}

export default rootSaga;

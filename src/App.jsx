import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actionCreators";
import KcpSales from "./pages/kcpSales";
import KcpSalesForm from "./pages/kcpSales/form";
import KcpSalesResult from "./pages/kcpSales/result";
import { GetQueryString } from "./utils/util";
class App extends Component {
  componentDidMount() {
    // this.props.initApp();
    console.log("到这了");
  }
  render() {
    const { finishInit } = this.props;
    const path = GetQueryString("path");

    return (
      <Fragment>
        {finishInit ? (
          <div>
            <Switch>
              <Route path="/kcpSales" exact component={KcpSales}></Route>
              <Route
                path="/kcpSales/form"
                exact
                component={KcpSalesForm}
              ></Route>
              <Route
                path="/kcpSales/result"
                exact
                component={KcpSalesResult}
              ></Route>
              {path && <Redirect from="/" to={path} />}
            </Switch>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    finishInit: state.get("finishInit"),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initApp: function () {
      dispatch(actionCreators.initApp());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

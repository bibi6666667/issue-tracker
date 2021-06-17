import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "components/login/Login";
import OAuthCallback from "components/login/OAuthCallback";
import Home from "components/home/Home";
import Editor from "components/editor/Editor";
import Detail from "components/detail/Detail";

function Router() {
  // TODO: token check
  const renderFirstPage = () => (false ? <Redirect to="/home" /> : <Redirect to="/login" />);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">{renderFirstPage()}</Route>
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/oauth-callback" component={OAuthCallback}></Route>
        <Route exact path="/home"><Home/></Route>
        <Route exact path="/editor"><Editor/></Route>
        <Route exact path="/detail"><Detail/></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

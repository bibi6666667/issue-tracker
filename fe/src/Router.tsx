import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "components/login/Login";
import Home from "components/home/Home";
import Editor from "components/editor/Editor";
import Detail from "components/detail/Detail";

function Router() {
  // TODO: token check
  const renderFirstPage = () => (false ? <Redirect to="/home" /> : <Redirect to="/login" />);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={renderFirstPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/editor" component={Editor} />
        <Route exact path="/detail" component={Detail} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

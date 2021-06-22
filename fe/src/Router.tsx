import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "components/home/Home";
import Detail from "components/detail/Detail";
// import IssueEditor from "components/editor/IssueEditor";
import IssueEditorContainer from "components/editor/IssueEditor.container";
import LabelPage from "components/labels/LabelPage";
import MilestonePage from "components/milestones/MilestonePage";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/editor" component={IssueEditorContainer} />
        <Route path="/detail" component={Detail} />
        <Route path="/labels" component={LabelPage} />
        <Route path="/milestones" component={MilestonePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

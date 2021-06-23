import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "components/home/Home";
import Detail from "components/detail/Detail";
import IssueEditorContainer from "components/editor/IssueEditor.container";
// import MilestoneContainer from "components/milestones/MilestonePage";
import LabelPageContainer from "components/labelsAndMiilestones/LabelPage.container";
import MilestoneContainer from "components/labelsAndMiilestones/Milestone.container";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/editor" component={IssueEditorContainer} />
        <Route path="/detail" component={Detail} />
        <Route path="/labels" component={LabelPageContainer} />
        <Route path="/milestones" component={MilestoneContainer} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

import React from "react";
// import { IssueRefMenuProps, IssueRefStateType, IssueType } from "utils/interface";
// import { selectionState } from "utils/states";
import IssueAppBarContainer from "./issueAppBar/IssueAppBar.container";
import { mock_openedIssue } from "data/openIssue";
import { mock_closedIssue } from "data/closeIssue";
import { useRecoilState, useSetRecoilState } from "recoil";
import { openedIssues, closedIssues } from "utils/states";
import { useEffect } from "react";
import { URL } from "utils/urls";

function IssueList() {
  const [openIssues, setOpenIssues] = useRecoilState(openedIssues);
  const [closeIssues, setCloseIssues] = useRecoilState(closedIssues);

  useEffect(() => {
    const request = async () => {
      const response = await fetch(URL.endPoint("issue/open"));
      const json = await response.json();
      setOpenIssues([...json.data]);
      sessionStorage.setItem("openIssues", JSON.stringify([...json.data]));
    };
    request();
  }, []);

  useEffect(() => {
    const closeIssuesData = sessionStorage.getItem("closeIssues");
    if (closeIssuesData) {
      const newCloseIssues = JSON.parse(closeIssuesData);
      setCloseIssues([...newCloseIssues]);
      return;
    }
    const request = async () => {
      const response = await fetch(URL.endPoint("issue/close"));
      const json = await response.json();
      setCloseIssues([...json.data]);
      sessionStorage.setItem("closeIssues", JSON.stringify([...json.data]));
    };
    request();
  }, []);

  return (
    <div>
      <IssueAppBarContainer />
    </div>
  );
}

export default IssueList;

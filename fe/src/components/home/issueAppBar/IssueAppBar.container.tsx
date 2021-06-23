import { IssueRefMenuProps, SimpleAppBarProps } from "utils/interface";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import IssueAppBarPresenter from "./IssueAppBar.presenter";
import {
  openState,
  closeState,
  openedIssues,
  closedIssues,
  selectedIssuesState,
  issueRefArrayState,
} from "utils/states";
import { useEffect } from "react";
import { URL } from "utils/urls";
// import { milestones } from "data/milestone";
// import { labels } from "data/label";

export default function IssueAppBarContainer() {
  const openIssues = useRecoilValue(openedIssues);
  const closeIssues = useRecoilValue(closedIssues);
  const setOpen = useSetRecoilState(openState);
  const setClose = useSetRecoilState(closeState);
  const [issueRefArray, setIssueRefArray] = useRecoilState(issueRefArrayState);

  useEffect(() => {
    const getAssignees = async () => {
      const response = await fetch(URL.endPoint("user/assignee"));
      const json = await response.json();
      const data = json.data;
      setIssueRefArray({
        ...issueRefArray,
        assignee: [...data].map((e) => ({ id: e.login_id, title: e.name })),
      });
    };
    const getAuthors = async () => {
      const response = await fetch(URL.endPoint("user/author"));
      const json = await response.json();
      const data = json.data;
      setIssueRefArray({
        ...issueRefArray,
        author: [...data].map((e) => ({ id: e.login_id, title: e.name })),
      });
    };
    const getMilestones = async () => {
      const response = await fetch(URL.endPoint("milestone"));
      const json = await response.json();
      const data = json.data;
      setIssueRefArray({
        ...issueRefArray,
        milestone: [...data].map((e) => ({ id: e.id, title: e.title })),
      });
    };
    const getLabels = async () => {
      const sessionStorageLabels = sessionStorage.getItem("labels");
      if (sessionStorageLabels) {
        const data = JSON.parse(sessionStorageLabels);
        setIssueRefArray({
          ...issueRefArray,
          label: [...data].map((e) => ({ id: e.id, title: e.title })),
        });
        return;
      }
      const response = await fetch(URL.endPoint("label"));
      const json = await response.json();
      const data = json.data;
      setIssueRefArray({
        ...issueRefArray,
        label: [...data].map((e) => ({ id: e.id, title: e.title })),
      });
    };
    getAssignees();
    getAuthors();
    getMilestones();
    getLabels();
  }, []);

  console.log(issueRefArray);

  const showOpenIssue = () => {
    setClose(false);
    setOpen(true);
  };

  const showCloseIssue = () => {
    setOpen(false);
    setClose(true);
  };

  return (
    <IssueAppBarPresenter
      {...{ openIssues, closeIssues, showCloseIssue, showOpenIssue, issueRefArray }}
    />
  );
}

// const issueRefArray: IssueRefMenuProps[] = [
//   {
//     buttonTitle: "assignee",
//     listItems: [
//       { id: "adelakim5", title: "Adela" },
//       { id: "bibi6666667", title: "Bibi" },
//       { id: "cchoongh", title: "Neis" },
//       { id: "zzisun", title: "V" },
//       { id: "jihye-woo", title: "Woody" },
//     ],
//   },
//   {
//     buttonTitle: "label",
//     listItems: labels.data.map((label) => ({ id: label.id, title: label.title })),
//   },
//   {
//     buttonTitle: "milestone",
//     listItems: milestones.data.map((mile) => ({ id: mile.id, title: mile.title })),
//   },
//   {
//     buttonTitle: "author",
//     listItems: [
//       { id: "adelakim5", title: "Adela" },
//       { id: "bibi6666667", title: "Bibi" },
//       { id: "cchoongh", title: "Neis" },
//       { id: "zzisun", title: "V" },
//       { id: "jihye-woo", title: "Woody" },
//     ],
//   },
// ];

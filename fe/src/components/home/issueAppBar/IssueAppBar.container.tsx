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

  console.log(issueRefArray);

  useEffect(() => {
    const getResponse = async () => {
      const assigneeRes = await fetch(URL.endPoint("user/assignee"));
      const authorRes = await fetch(URL.endPoint("user/author"));
      const labelRes = await fetch(URL.endPoint("label"));
      const milestoneRes = await fetch(URL.endPoint("milestone"));
      const assigneeJson = await assigneeRes.json();
      const authorJson = await authorRes.json();
      const labelJson = await labelRes.json();
      const milestoneJson = await milestoneRes.json();
      const assignee = assigneeJson.data;
      const author = authorJson.data;
      const milestone = milestoneJson.data;
      const label = labelJson.data;
      setIssueRefArray({
        ...issueRefArray,
        assignee: [...assignee].map((e) => ({ id: e.login_id, title: e.name })),
        author: [...author].map((e) => ({ id: e.login_id, title: e.name })),
        milestone: [...milestone].map((e) => ({ id: e.id, title: e.title })),
        label: [...label].map((e) => ({ id: e.id, title: e.title })),
      });
      sessionStorage.setItem("assigneeListItems", JSON.stringify(assignee));
      sessionStorage.setItem("milestoneListItems", JSON.stringify(milestone));
      sessionStorage.setItem("authorListItems", JSON.stringify(author));
      sessionStorage.setItem("labelListItems", JSON.stringify(label));
    };
    getResponse();
  }, []);

  const showOpenIssue = () => {
    setClose(false);
    setOpen(true);
  };

  const showCloseIssue = () => {
    setOpen(false);
    setClose(true);
  };

  return <IssueAppBarPresenter {...{ openIssues, closeIssues, showCloseIssue, showOpenIssue }} />;
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

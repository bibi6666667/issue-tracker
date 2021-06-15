import { SimpleAppBarProps } from "utils/interface";
import { useRecoilState } from "recoil";
import IssueAppBarPresenter from "./IssueAppBar.presenter";
import { openState, closeState } from "utils/states";

export default function IssueAppBarContainer({ openedIssue, closedIssue }: SimpleAppBarProps) {
  const [, setOpen] = useRecoilState(openState);
  const [, setClose] = useRecoilState(closeState);

  const showOpenIssue = () => {
    setClose(false);
    setOpen(true);
  };

  const showCloseIssue = () => {
    setOpen(false);
    setClose(true);
  };

  const issueRefArray = [
    {
      buttonTitle: "담당자",
      listItems: [
        { id: 0, title: "Adela" },
        { id: 1, title: "Bibi" },
        { id: 2, title: "Neis" },
        { id: 3, title: "V" },
        { id: 4, title: "Woody" },
      ],
    },
    {
      buttonTitle: "레이블",
      listItems: [
        { id: 0, title: "fe" },
        { id: 1, title: "be" },
        { id: 2, title: "ios" },
      ],
    },
    {
      buttonTitle: "마일스톤",
      listItems: [
        { id: 0, title: "마스터즈코스" },
        { id: 1, title: "프론트엔드" },
        { id: 2, title: "백엔드" },
        { id: 3, title: "모바일" },
      ],
    },
    {
      buttonTitle: "작성자",
      listItems: [
        { id: 0, title: "Adela" },
        { id: 1, title: "Bibi" },
        { id: 2, title: "Neis" },
        { id: 3, title: "V" },
        { id: 4, title: "Woody" },
      ],
    },
  ];

  return (
    <IssueAppBarPresenter
      {...{ openedIssue, closedIssue, showCloseIssue, showOpenIssue, issueRefArray }}
    />
  );
}

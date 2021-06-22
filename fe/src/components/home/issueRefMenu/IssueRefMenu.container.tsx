import React from "react";
import IssueRefMenuPresenter from "./IssueRefMenu.presenter";
import { IssueRefMenuProps, UsefulObjectType } from "utils/interface";
import { useRecoilState } from "recoil";
import { issueRefArrayState } from "utils/states";

export default function IssueRefMenuContainer({ buttonTitle, listItems }: IssueRefMenuProps) {
  const [refState, setRefState] = useRecoilState(issueRefArrayState);

  const handleChange = (event: React.ChangeEvent<UsefulObjectType>) => {
    const name = event.target.name as keyof typeof refState;
    setRefState({
      ...refState,
      [name]: event.target.value,
    });
  };

  return <IssueRefMenuPresenter {...{ buttonTitle, listItems, handleChange, refState }} />;
}

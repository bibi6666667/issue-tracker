import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { labels } from "data/label";
import { milestones } from "data/milestone";
import { assiginees } from "data/people";
import { useRecoilState, useRecoilValue } from "recoil";
import { EditorRefsType, TemporalRefStateType } from "utils/interface";
// import { temporalRefState } from "utils/states";
import AccordionPanel from "./AccordionPanel";
import { URL } from "utils/urls";
import { issueRefArrayState, temporalRefState } from "utils/states";

export default function EditorAccordion({ assigneesRef, milestoneRef, labelsRef }: EditorRefsType) {
  const [expanded, setExpanded] = useState<string | false>(false);
  // const [refsState, setRefState] = useState<TemporalRefStateType>({
  //   assignees: [],
  //   labels: [],
  //   milestones: [],
  // });
  const [temporalState, setTemporalState] = useRecoilState(temporalRefState);
  const [issueRefArray, setIssueRefArray] = useRecoilState(issueRefArrayState);
  console.log(issueRefArray);

  useEffect(() => {
    const assignee = sessionStorage.getItem("assigneeListItems");
    if (assignee) {
      setIssueRefArray({
        ...issueRefArray,
        assignee: JSON.parse(assignee).map((e: any) => ({ id: e.id, title: e.name })),
      });
    }

    const milestone = sessionStorage.getItem("milestoneListItems"); // TODO: 라벨, 마일스톤 데이터 받아서 IssueRefArray로 하기
  }, []);

  // useEffect(() => {
  //   const getLabels = async () => {
  //     const labels = await fetch(URL.endPoint("label"));
  //     const json = await labels.json();
  //     setRefState({
  //       ...refsState,
  //       labels: [...json.data],
  //     });
  //   };
  //   getLabels()
  // }, []); user정보 다 불러오는 api 완성되면 그 때 다시 구현하기

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickToSelect =
    (id: string | number, title: string, key: keyof typeof temporalState) => () => {
      const newList = [...temporalState[key]];
      if (!newList.length || !newList.filter((item) => item.id === id).length)
        newList.push({ id, title });
      setTemporalState({
        ...temporalState,
        [key]: newList,
      });
    };

  const handleDelete = (id: string | number, key: keyof typeof temporalState) => () => {
    const newList = [...temporalState[key]].filter((item) => item.id !== id);
    setTemporalState({
      ...temporalState,
      [key]: newList,
    });
  };

  return (
    <Grid item xs={3}>
      <AccordionPanel
        {...{ expanded, handleChange, handleDelete, handleClickToSelect }}
        keyName="assignees"
        temporalArray={temporalState.assignees}
        expandedValue="panel1"
      />
      <AccordionPanel
        {...{ expanded, handleChange, handleDelete, handleClickToSelect }}
        keyName="milestones"
        temporalArray={temporalState.milestones}
        expandedValue="panel2"
      />
      <AccordionPanel
        {...{ expanded, handleChange, handleDelete, handleClickToSelect }}
        keyName="labels"
        temporalArray={temporalState.labels}
        expandedValue="panel3"
      />
    </Grid>
  );
}

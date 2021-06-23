import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { EditorRefsType, TemporalRefStateType } from "utils/interface";
import AccordionPanel from "./AccordionPanel";
import { issueRefArrayState, temporalRefState } from "utils/states";
// import { labels } from "data/label";
// import { milestones } from "data/milestone";
// import { assiginees } from "data/people";
// import { temporalRefState } from "utils/states";
// import { URL } from "utils/urls";

export default function EditorAccordion() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [temporalState, setTemporalState] = useRecoilState(temporalRefState);
  const [issueRefArray, setIssueRefArray] = useRecoilState(issueRefArrayState);

  useEffect(() => {
    const assignee = sessionStorage.getItem("assigneeListItems");
    const milestone = sessionStorage.getItem("milestoneListItems");
    const label = sessionStorage.getItem("labelListItems");
    if (assignee && milestone && label) {
      setIssueRefArray({
        ...issueRefArray,
        assignee: JSON.parse(assignee).map((e: any) => ({ id: e.id, title: e.name })),
        milestone: JSON.parse(milestone).map((e: any) => ({ id: e.id, title: e.title })),
        label: JSON.parse(label).map((e: any) => ({ id: e.id, title: e.title })),
      });
    }
  }, []);

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
        temporalArray={issueRefArray.assignee}
        expandedValue="panel1"
      />
      <AccordionPanel
        {...{ expanded, handleChange, handleDelete, handleClickToSelect }}
        keyName="milestones"
        temporalArray={issueRefArray.milestone}
        expandedValue="panel2"
      />
      <AccordionPanel
        {...{ expanded, handleChange, handleDelete, handleClickToSelect }}
        keyName="labels"
        temporalArray={issueRefArray.label}
        expandedValue="panel3"
      />
    </Grid>
  );
}

import React, { useRef } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import "@toast-ui/editor/dist/toastui-editor.css";
import IssueEditorPresenter from "./IssueEditor.presenter";
import { URL } from "utils/urls";
import { issueRefArrayState, temporalRefState } from "utils/states";
import { useEffect } from "react";

const issueDetailContentState = atom({
  key: "issueDetailContent",
  default: {
    title: "",
    content_md: "",
    content_html: "",
    assignee: [],
    author: "",
    milestone: "",
  },
});

function IssueEditorContainer() {
  // const [issueDetailContent, setIssueDetailContent] = useRecoilState(issueDetailContentState);

  const editorRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  const temporalState = useRecoilValue(temporalRefState);

  console.log(temporalState);

  const handleSubmit = () => {
    const editorInstance = editorRef.current.getInstance();
    const content_md = editorInstance.getMarkdown();
    const content_html = editorInstance.getHTML();
    console.log(content_html);
    // const title = titleRef.current.value;
    const body = JSON.stringify({
      title: titleRef.current.value,
      content: content_html,
      created_at: "2021-06-24 16:04:00",
      user: {
        id: 1,
        name: "adela",
        login_id: "adelakim5",
      },
      milestone_id: temporalState.milestones[0] ? temporalState.milestones[0].id.toString() : null,
      label_id_list: temporalState.labels.map((e) => e.id),
      assignee_list: temporalState.assignees.map((e) => ({ user_id: e.id })),
    });

    console.log(body);

    fetch(URL.endPoint("issue"), {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  };

  return (
    <div>
      <IssueEditorPresenter {...{ handleSubmit, editorRef, titleRef }} />
    </div>
  );
}

export default IssueEditorContainer;

import React, { useRef } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Backdrop, Fade, TextField, Typography } from "@material-ui/core";
import { URL } from "utils/urls";
import { useRecoilState } from "recoil";
import { currLabelsState, currMilestoneState } from "utils/states";
import styled from "styled-components";

interface TransitionsModalProps {
  open: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  mode: string;
}

export default function TransitionsModal(props: TransitionsModalProps) {
  const { open, handleCloseModal, handleOpenModal, mode } = props;
  const classes = useStyles();
  const titleRef = useRef<any>(null);
  const labelColorRef = useRef<any>(null);
  const milestoneContentRef = useRef<any>(null);
  const milestoneDueDateRef = useRef<any>(null);
  const [labelState, setLabelState] = useRecoilState(currLabelsState);
  const [milestoneState, setMilestoneState] = useRecoilState(currMilestoneState);

  const save = () => {
    if (mode === "createLabel") {
      const request = async () => {
        const response = await fetch(URL.endPoint("label"), {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titleRef.current.value,
            content: null,
            color: labelColorRef.current.value,
          }),
        });
        const newLabel = await response.json();
        const newLabels = [...labelState].concat({ ...newLabel.data });
        setLabelState(newLabels);
        sessionStorage.setItem("labels", JSON.stringify(newLabels));
      };
      request();
      handleCloseModal();
      return;
    }
    if (mode === "createMilestone") {
      const request = async () => {
        const response = await fetch(URL.endPoint("milestone"), {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titleRef.current.value,
            content: milestoneContentRef.current.value,
            due_date: milestoneDueDateRef.current.value,
          }),
        });
        const newMiletone = await response.json();
        const newMilestones = [...milestoneState].concat({ ...newMiletone.data });
        setMilestoneState(newMilestones);
        sessionStorage.setItem("milestones", JSON.stringify(newMilestones));
      };

      request();
      handleCloseModal();
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        추가
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              {mode === "createLabel" ? "레이블 추가" : "마일스톤 추가"}
            </Typography>
            <TextField
              required
              inputRef={titleRef}
              placeholder="이름"
              label={mode === "createLabel" ? "Label Title" : "Milestone Title"}
            />
            {mode === "createLabel" && (
              <TextField inputRef={labelColorRef} placeholder="색깔" label="Label Color" />
            )}
            {mode === "createMilestone" && (
              <TextFields>
                <TextField
                  inputRef={milestoneContentRef}
                  placeholder="내용"
                  label="Milestone Content"
                />
                <TextField
                  inputRef={milestoneDueDateRef} // TODO: 달력으로 바꾸기
                  placeholder="기한"
                  label="Milestone Due-date"
                />
              </TextFields>
            )}
            <Button onClick={save} variant="contained" color="primary">
              저장
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const TextFields = styled.div`
  display: flex;
  flex-direction: column;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      "& > *": {
        margin: "10px 0",
      },
    },
  })
);

import React, { useState, useRef } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Backdrop, Fade, TextField, Typography } from "@material-ui/core";
import { throttleAndDebounce } from "utils/debounceAndThrottle.js";
import { URL } from "utils/urls";
import { useRecoilState } from "recoil";
import { currLabelsState } from "utils/states";

interface TransitionsModalProps {
  open: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  mode: string;
}

export default function TransitionsModal(props: TransitionsModalProps) {
  const { open, handleCloseModal, handleOpenModal, mode } = props;
  const classes = useStyles();
  const title = useRef<any>(null);
  const labelColor = useRef<any>(null);
  const [labelState, setLabelState] = useRecoilState(currLabelsState);

  const save = () => {
    if (mode === "label") {
      fetch(URL.endPoint("label"), {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: null,
          color: labelColor,
        }),
      });
      handleCloseModal();
      setLabelState(
        [...labelState].concat({
          id: labelState.length,
          title: title.current.value,
          color: labelColor.current.value,
        })
      );
    }
  };

  // const handleChange = (e: React.ChangeEvent, keyName: string) => {
  // const _ = throttleAndDebounce();
  // const debounce =
  //   keyName === "title"
  //     ? _.debounce(() => setTitle(e.target?.nodeValue), 200)
  //     : _.debounce(() => setLabelColor(e.target?.nodeValue || "#fff"), 200);

  // debounce();
  // };

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
              {mode === "label" ? "레이블 추가" : "마일스톤 추가"}
            </Typography>
            <TextField
              required
              ref={title}
              placeholder="이름"
              label={mode === "label" ? "Label Title" : "Milestone Title"}
            />
            {mode === "label" && (
              <TextField ref={labelColor} placeholder="색깔" label="Label Color" />
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

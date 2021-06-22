import { useState } from "react";
import {
  Button,
  ButtonGroup,
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  makeStyles,
  Chip,
} from "@material-ui/core";
import Header from "components/common/Header";
import { useRecoilState } from "recoil";
import { currLabelsState } from "utils/states";
import { useEffect } from "react";
import { URL } from "utils/urls";
import styled from "styled-components";
import TransitionsModal from "components/common/TransitionsModal";

function LabelPage() {
  const [labelState, setLabelState] = useRecoilState(currLabelsState);
  const [open, setOpenState] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const labels = sessionStorage.getItem("labels");
    if (labels) {
      setLabelState(JSON.parse(labels));
      return;
    }
    const request = async () => {
      const response = await fetch(URL.endPoint("label"));
      const json = await response.json();
      setLabelState([...json.data]);
      sessionStorage.setItem("labels", JSON.stringify([...json.data]));
    };
    request();
  }, []);

  const handleOpenModal = () => {
    setOpenState(true);
  };

  const handleCloseModal = () => {
    setOpenState(false);
  };

  return (
    <div>
      <Header />
      <HeaderButtons>
        <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
          <Button href="/labels">레이블</Button>
          <Button href="/milestones">마일스톤</Button>
        </ButtonGroup>
        {/* <Button
          onClick={() => setAddLabelState(!addLabelState)}
          variant="contained"
          color="primary"
        >
          추가
        </Button> */}
        <TransitionsModal {...{ open, handleCloseModal, handleOpenModal }} mode="label" />
      </HeaderButtons>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography>{labelState.length}개의 레이블</Typography>
        </Toolbar>
      </AppBar>
      {labelState.map((label) => (
        <Card className={classes.root} variant="outlined">
          <CardContent className={classes.card}>
            <Chip label={label.title} style={{ backgroundColor: `#${label.color}` }} />
            <ButtonGroup>
              <Button>편집</Button>
              <Button>삭제</Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default LabelPage;

const HeaderButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
`;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "0 2px",
  },
  appBar: {
    marginBottom: "10px",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
  chip: {
    margin: "0 3px",
  },
});

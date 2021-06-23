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
import styled from "styled-components";
import TransitionsModal from "./TransitionsModal";
import { MilestoneType } from "utils/interface";

interface LabelPageProps {
  open: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  page: string;
  [key: string]: any;
}

function Presenter(props: LabelPageProps) {
  const { handleOpenModal, handleCloseModal, open, page } = props;
  const state = page === "label" ? props.labelState : props.milestoneState;
  const classes = useStyles();

  return (
    <div>
      <Header />
      <HeaderButtons>
        <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
          <Button href="/labels">레이블</Button>
          <Button href="/milestones">마일스톤</Button>
        </ButtonGroup>
        <TransitionsModal {...{ open, handleCloseModal, handleOpenModal }} mode="createMilestone" />
      </HeaderButtons>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography>
            {state.length}개의 {page === "label" ? "레이블" : "마일스톤"}
          </Typography>
        </Toolbar>
      </AppBar>
      <LabelCards>
        {state.map((el: MilestoneType) => (
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.card}>
              <Chip label={el.title} style={{ backgroundColor: el.color }} />
              {page === "milestone" && <Typography>기한: {el.due_date}</Typography>}
              <ButtonGroup>
                <Button>편집</Button>
                <Button>삭제</Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        ))}
      </LabelCards>
    </div>
  );
}

export default Presenter;

const HeaderButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
`;

const LabelCards = styled.div`
  display: flex;
  flex-direction: column-reverse;
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

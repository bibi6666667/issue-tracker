import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { IssueDetailType } from "utils/interface";
import { URL } from "utils/urls";
import Header from "components/common/Header";
import styled from "styled-components";
import {
  Box,
  Typography,
  Chip,
  Paper,
  TextField,
  Grid,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useStyles } from "./styles/useStyles";

// import { currDetailState } from "utils/states";

function Detail() {
  // const currDetail = useRecoilValue(currDetailState);
  const { id } = useParams<{ id: string }>();
  // const [currDetail, setCurrDetail] = useRecoilState<IssueDetailType>({});
  const [currDetail, setCurrDetail] = useState<IssueDetailType | null>(null);
  const classes = useStyles();
  console.log(id);

  useEffect(() => {
    const request = async () => {
      const response = await fetch(URL.endPoint(`issue/${id}`));
      const json = await response.json();
      setCurrDetail({
        ...json.data,
      });
    };
    request();
  }, []);

  return (
    <div>
      <Header />
      <HeadSection>
        <TitleBox>
          <Typography variant="h5" gutterBottom>
            {currDetail?.title}
          </Typography>
          <AdditionalTitleBox>
            <Chip label={currDetail?.status ? "열린 이슈" : "닫힌 이슈"} />
            <Typography>
              이 이슈가 {currDetail?.created_at}에 {currDetail?.author.name}님에 의해
              작성되었습니다.
            </Typography>
          </AdditionalTitleBox>
        </TitleBox>
        <div>
          <ButtonGroup variant="contained" color="primary">
            <Button>제목 편집</Button>
            <Button>이슈 닫기</Button>
          </ButtonGroup>
        </div>
      </HeadSection>
      <BodySection className={classes.root}>
        <Paper className={classes.paper} variant="outlined">
          <Box display="flex">
            <Box flex={8} mx={2} border="1px solid" borderRight="1px solid" borderColor="#ddd">
              <Box display="flex" flexDirection="column">
                <Box bgcolor="#f1f1f1">
                  <Box display="flex" justifyContent="space-between" px={2} py={3}>
                    <Box display="flex" alignItems="center" gridGap={10}>
                      <Box>{currDetail?.author.name}</Box>
                      <Box>{currDetail?.created_at}</Box>
                    </Box>
                    <Box display="flex" gridGap={10} alignItems="center">
                      <Chip label="작성자" variant="outlined" />
                      <Button color="primary" variant="outlined">
                        편집
                      </Button>
                      <InsertEmoticonIcon />
                    </Box>
                  </Box>
                </Box>
                <Box px={2} py={3} borderTop="1px solid" borderColor="#ddd">
                  <Box
                    dangerouslySetInnerHTML={{ __html: currDetail ? currDetail.content : "" }}
                  ></Box>
                </Box>
              </Box>
            </Box>
            <Box flex={2} border="1px solid" mx={2}>
              aaaa
            </Box>
          </Box>
        </Paper>
      </BodySection>
      {JSON.stringify(currDetail)}
    </div>
  );
}

export default Detail;

const HeadSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

const BodySection = styled.section``;

const TitleBox = styled.div``;

const AdditionalTitleBox = styled.div`
  display: flex;
  align-items: center;
`;

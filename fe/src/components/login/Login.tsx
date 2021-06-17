import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import OAuthBtnGroup from './OAuthBtnGroup';
import { API } from 'utils/API';

const oauthBtnCommonStyle = {
  width: '200px',
  size: 'large',
  border: 'none',
  fontSize: 20,
  fontWeight: 800
}

const GithubOAuthBtn = withStyles({
  root: {
    ...oauthBtnCommonStyle,
    color: 'white',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'gray'
    }
  },
  label: {
    textTransform: 'none',
  }
})(Button);

function Login(): ReactElement {
  const renderOAuthBtns = (): ReactElement[] => [
    <GithubOAuthBtn key="0" variant="contained" href={API.githubLogin()}>Github</GithubOAuthBtn>
  ];

  return (
    <StyledLogin>
      <OAuthBtnGroup>
        {renderOAuthBtns()}
      </OAuthBtnGroup>
    </StyledLogin>
  )
}

export default Login;

const StyledLogin = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

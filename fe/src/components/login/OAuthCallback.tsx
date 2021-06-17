import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { API } from 'utils/API';

function OAuthCallback({ location }: RouteComponentProps): ReactElement {
  const authCode = queryString.parse(location.search).code;
  
  const getAccessToken = async () => {
    const res = await fetch(API.accessToken({ code: authCode }));
    // window.localStorage.setItem('access-token', res.body.??);
  }

  return (
    <div>
    </div>
  )
}

export default OAuthCallback;

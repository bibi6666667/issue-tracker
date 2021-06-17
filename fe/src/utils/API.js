const BASE_URL = 'http://3.35.137.242:8080';
const LOCALHOST = 'http://localhost:3000';

// TODO: move to the appopriate location
const CLIENT_ID = '7bd8b036c3471804563e';
const OAUTH_CALLBACK_URL = `${LOCALHOST}/oauth-callback`;

export const API = {
  githubLogin: () => `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${OAUTH_CALLBACK_URL}`,
  accessToken: ({ code }) => BASE_URL + `/login/github?code=${code}`,
}
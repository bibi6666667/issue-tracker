import React, { ReactElement } from 'react';
import { ButtonGroup } from '@material-ui/core';

type OAuthBtnGroupProps = {
  children: ReactElement[]
}

function OAuthBtnGroup({ children }: OAuthBtnGroupProps): ReactElement {
  return (
    <ButtonGroup orientation="vertical" >
      {children}
    </ButtonGroup>
  )
}

export default OAuthBtnGroup;

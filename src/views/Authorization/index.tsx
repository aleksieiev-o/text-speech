import React, { FC, ReactElement } from 'react';
import { useAuthRouteCondition } from './useAuthRouteCondition';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Authorization: FC = (): ReactElement => {
  const isSignInRoute = useAuthRouteCondition();

  return (
    <div>
      {
        isSignInRoute ? <SignIn/> : <SignUp/>
      }
    </div>
  );
};

export default Authorization;

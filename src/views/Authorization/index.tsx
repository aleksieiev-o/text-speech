import React, { FC, ReactElement } from 'react';
import { useAuthRouteCondition } from './useAuthRouteCondition';
import Header from '../../components/Header';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Authorization: FC = (): ReactElement => {
  const isSignInRoute = useAuthRouteCondition();

  return (
    <>
      <Header/>

      {
        isSignInRoute ? <SignIn/> : <SignUp/>
      }
    </>
  );
};

export default Authorization;

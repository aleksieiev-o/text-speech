import React, { FC, ReactElement } from 'react';
import {  Route, Routes } from 'react-router-dom';
import SignIn from '../views/Authorization/SignIn';
import SignUp from '../views/Authorization/SignUp';

export enum PublicRoutes {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

const PublicRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path={PublicRoutes.SIGN_IN} element={<SignIn/>}/>
      <Route path={PublicRoutes.SIGN_UP} element={<SignUp/>}/>

      {/*<Route path="*" element={<Navigate to={PublicRoutes.SIGN_IN} replace={true}/>}/>*/}
    </Routes>
  );
};

export default PublicRouter;

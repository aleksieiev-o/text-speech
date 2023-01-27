import React, { FC, ReactElement } from 'react';
import {  Route, Routes } from 'react-router-dom';
import SignIn from '../views/Authorization/SignIn';
import SignUp from '../views/Authorization/SignUp';

const PublicRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path={'sign-in'} element={<SignIn/>}/>
      <Route path={'sign-up'} element={<SignUp/>}/>

      {/*<Route path="*" element={<Navigate to={'sign-in'} replace={true}/>}/>*/}
    </Routes>
  );
};

export default PublicRouter;

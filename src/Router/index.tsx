import React, { FC, ReactElement } from 'react';
import Header from '../components/Header';
import { useStore } from '../store/hooks';
import ProtectedRouter from './ProtectedRouter';
import PublicRouter from './PublicRouter';

const Router: FC = (): ReactElement => {
  const { isAuth } = useStore().authorizationStore;

  return (
    <>
      <Header/>

      {
        isAuth ? <ProtectedRouter/> : <PublicRouter/>
      }
    </>
  );
};

export default Router;

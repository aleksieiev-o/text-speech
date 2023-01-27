import React, { FC, ReactElement } from 'react';
import Header from '../components/Header';
import { useAuthorizationStore } from '../store/hooks';
import ProtectedRouter from './ProtectedRouter';
import PublicRouter from './PublicRouter';
import { observer } from 'mobx-react-lite';

const Router: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();

  return (
    <>
      <Header/>

      {
        authorizationStore.isAuth ? <ProtectedRouter/> : <PublicRouter/>
      }
    </>
  );
});

export default Router;

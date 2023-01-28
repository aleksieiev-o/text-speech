import React, { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorizationStore } from '../../store/hooks';
import { ProtectedRoutes, PublicRoutes } from '../../Router';
import { observer } from 'mobx-react-lite';

const NotFoundPage: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const navigate = useNavigate();

  return (
    <div>
      <h1>There is nothing interesting here</h1>

      <button onClick={() => navigate(authorizationStore.isAuth ? ProtectedRoutes.COLLECTIONS : PublicRoutes.SIGN_IN)}>Go back</button>
    </div>
  );
});

export default NotFoundPage;

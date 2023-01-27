import React, { FC, ReactElement } from 'react';
import styles from './header.module.scss';
import { APP_NAME } from '../../utils/constants';
import { useAuthorizationStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../Router/PublicRouter';

const Header: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await authorizationStore.singOutEmailAndPassword();
      navigate(PublicRoutes.SIGN_IN);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className={styles.header}>
      <p>
        {APP_NAME}
      </p>

      {
        authorizationStore.isAuth && <button onClick={logoutHandler}>Logout</button>
      }
    </div>
  );
});

export default Header;

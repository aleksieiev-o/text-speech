import React, { FC, ReactElement } from 'react';
import styles from './header.module.scss';
import { APP_NAME } from '../../utils/constants';
import { useStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../Router/PublicRouter';

const Header: FC = observer((): ReactElement => {
  const { singOutEmailAndPassword } = useStore().authorizationStore;
  const navigate = useNavigate();

  const logoutHandler = () => {
    try {
      singOutEmailAndPassword();
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

      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
});

export default Header;

import React, { FC, ReactElement } from 'react';
import styles from './header.module.scss';
import { APP_NAME } from '../../utils/constants';

const Header: FC = (): ReactElement => {
  return (
    <div className={styles.header}>
      <p>
        {APP_NAME}
      </p>
    </div>
  );
};

export default Header;

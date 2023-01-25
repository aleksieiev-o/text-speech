import React, { FC, ReactElement } from 'react';
import styles from './header.module.scss';

const Header: FC = (): ReactElement => {
  return (
    <div className={styles.header}>
      <p>Text speech</p>
    </div>
  );
};

export default Header;

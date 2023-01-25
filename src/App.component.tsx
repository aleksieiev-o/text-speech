import React, { FC, ReactElement } from 'react';
import styles from './app.module.scss';

const AppComponent: FC = (): ReactElement => {
  return (
    <div className={styles.wrapper}>
      AppComponent
    </div>
  );
};

export default AppComponent;

import React, { FC, ReactElement } from 'react';
import styles from './app.module.scss';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

const App: FC = (): ReactElement => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </div>
    );
};

export default App;

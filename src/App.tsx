import React, { FC, ReactElement } from 'react';
import styles from './app.module.scss';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import StoreContextProvider from './Providers/StoreContext.provider';

const App: FC = (): ReactElement => {
  return (
    <div className={styles.app}>
      <StoreContextProvider>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </StoreContextProvider>
    </div>
  );
};

export default App;

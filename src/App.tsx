import React, { FC, ReactElement } from 'react';
import styles from './app.module.scss';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import StoreContextProvider from './Providers/StoreContext.provider';

const App: FC = (): ReactElement => {
  return (
    <StoreContextProvider>
      <div className={styles.app}>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </div>
    </StoreContextProvider>
    );
};

export default App;

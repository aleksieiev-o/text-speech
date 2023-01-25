import React, { FC, ReactElement } from 'react';
import styles from './app.module.scss';
import Header from './components/Header';
import Collection from './views/Collection';

const App: FC = (): ReactElement => {
  return (
    <div className={styles.app}>
      <Header/>

      <Collection/>
    </div>
    );
};

export default App;

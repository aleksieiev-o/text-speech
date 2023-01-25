import React, { FC, ReactElement } from 'react';
import styles from './app.module.scss';
import Header from './components/Header';
import CollectionsList from './views/CollectionsList';

const App: FC = (): ReactElement => {
  return (
    <div className={styles.app}>
      <Header/>

      <CollectionsList/>
    </div>
    );
};

export default App;

import React, { FC, ReactElement } from 'react';
import styles from './collection-list.module.scss';
import ListHeader from '../../components/ListHeader';
import Header from '../../components/Header';

const CollectionsList: FC = (): ReactElement => {
  return (
    <>
      <Header/>

      <div className={styles.collectionList}>
        <ListHeader
          createButtonTitle={'Create collection'}
          removeButtonTitle={'Remove all collections'}/>

        <ul>
          <li>
            <span>1</span>
            <button>Edit</button>
            <button>Remove</button>
          </li>
          <li>
            <span>2</span>
            <button>Edit</button>
            <button>Remove</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CollectionsList;

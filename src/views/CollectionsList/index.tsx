import React, { FC, ReactElement } from 'react';
import styles from './collection-list.module.scss';
import ListHeader from '../../components/ListHeader';
import Header from '../../components/Header';
import { useCollectionsStore } from '../../store/hooks';
import { Collection } from '../../store/CollectionsStore';
import { observer } from 'mobx-react-lite';

const CollectionsList: FC = observer((): ReactElement => {
  const collectionsStore = useCollectionsStore();

  return (
    <>
      <Header/>

      <div className={styles.collectionList}>
        <ListHeader
          createButtonTitle={'Create collection'}
          removeButtonTitle={'Remove all collections'}/>

        {
          collectionsStore.collections.length
            ?
            <ul>
              {
                collectionsStore.collections.map((collection: Collection) => {
                  return <li key={collection.id}>
                    <span>{collection.title}</span>
                    <button>Edit</button>
                    <button>Remove</button>
                  </li>;
                })
              }
            </ul>
            :
            <span>Collections list is empty</span>
        }
      </div>
    </>
  );
});

export default CollectionsList;

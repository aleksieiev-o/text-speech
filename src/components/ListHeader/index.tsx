import React, { FC, FormEvent, ReactElement, useState } from 'react';
import { inputChangeHandler } from '../../utils/inputChangeHandler';
import { useCollectionsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';

interface Props {
  createButtonTitle: string;
  // createFormHandler: () => void;
  removeButtonTitle: string;
  removeButtonHandler: () => void;
}

const ListHeader: FC<Props> = observer((props): ReactElement => {
  const {createButtonTitle, removeButtonTitle} = props;
  const [collectionTitle, setCollectionTitle] = useState<string>('');
  const collectionsStore = useCollectionsStore();

  const createCollectionSubmitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await collectionsStore.createCollection(collectionTitle);
    await setCollectionTitle('');
  };

  return (
    <div>
      <form onSubmit={createCollectionSubmitHandler}>
        <input
          onChange={(e) => inputChangeHandler(e, setCollectionTitle)}
          value={collectionTitle}
          type="text"/>

        <button type={'submit'}>
          {createButtonTitle}
        </button>
      </form>

      <button onClick={() => collectionsStore.removeAllCollections()}>
        {removeButtonTitle}
      </button>
    </div>
  );
});

export default ListHeader;

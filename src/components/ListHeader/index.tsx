import React, { FC, FormEvent, ReactElement, useState } from 'react';
import { inputChangeHandler } from '../../utils/inputChangeHandler';
import { useCollectionsStore } from '../../store/hooks';

interface Props {
  createButtonTitle: string;
  // createButtonHandler: () => void;
  removeButtonTitle: string;
  // removeButtonHandler: () => void;
}

const ListHeader: FC<Props> = (props): ReactElement => {
  const {createButtonTitle, removeButtonTitle} = props;
  const [collectionTitle, setCollectionTitle] = useState<string>('');
  const collectionsStore = useCollectionsStore();

  const createCollectionSubmitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await collectionsStore.createCollection(collectionTitle);
  };

  return (
    <div>
      <form onSubmit={createCollectionSubmitHandler}>
        <input
        onChange={(e) => inputChangeHandler(e, setCollectionTitle)}
        value={collectionTitle}
        type="text"/>

        <button type={'submit'} name={createButtonTitle}>
          {createButtonTitle}
        </button>
      </form>

      <button name={removeButtonTitle}>
        {removeButtonTitle}
      </button>
    </div>
  );
};

export default ListHeader;

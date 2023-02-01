import React, { FC, FormEvent, ReactElement, useState } from 'react';
import { inputChangeHandler } from '../../utils/inputChangeHandler';
import { useCollectionsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { Button, FormControl, FormLabel, Icon, Input, Stack } from '@chakra-ui/react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  createButtonTitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  // createFormHandler: () => void;
  removeButtonTitle: string;
  removeButtonHandler: () => void;
}

const ListHeader: FC<Props> = observer((props): ReactElement => {
  const {createButtonTitle, inputLabel, inputPlaceholder, removeButtonTitle} = props;
  const [collectionTitle, setCollectionTitle] = useState<string>('');
  const collectionsStore = useCollectionsStore();

  const createCollectionSubmitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await collectionsStore.createCollection(collectionTitle);
    await setCollectionTitle('');
  };

  return (
    <Stack
    as={'section'}
    direction={'row'}
    w={'100%'}
    alignItems={'flex-end'}
    justifyContent={'flex-start'}
    mb={4}>
      <form onSubmit={createCollectionSubmitHandler}>
        <FormControl>
          <FormLabel>
            {inputLabel}
          </FormLabel>

          <Input
          onChange={(e) => inputChangeHandler(e, setCollectionTitle)}
          value={collectionTitle}
          placeholder={inputPlaceholder}
          type="text"/>
        </FormControl>

        <Button
        type={'submit'}
        leftIcon={<Icon as={AddIcon}/>}>
          {createButtonTitle}
        </Button>
      </form>

      <Button
      onClick={() => collectionsStore.removeAllCollections()}
      leftIcon={<Icon as={DeleteIcon}/>}>
        {removeButtonTitle}
      </Button>
    </Stack>
  );
});

export default ListHeader;

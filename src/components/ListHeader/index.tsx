import React, { FC, ReactElement } from 'react';
import { useCollectionsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { Button, Icon, Stack, useDisclosure } from '@chakra-ui/react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateCollectionModal from './CreateCollection.modal';

interface Props {
  createButtonTitle: string;
  removeButtonTitle: string;
  removeButtonHandler: () => void;
}

const ListHeader: FC<Props> = observer((props): ReactElement => {
  const {createButtonTitle, removeButtonTitle} = props;
  const collectionsStore = useCollectionsStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack
        as={'section'}
        direction={'row'}
        w={'full'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        mb={4}
        p={4}
        boxShadow={'md'}>
        <Button
          onClick={onOpen}
          colorScheme={'facebook'}
          leftIcon={<Icon as={AddIcon}/>}>
          {createButtonTitle}
        </Button>

        <Button
          onClick={() => collectionsStore.removeAllCollections()}
          colorScheme={'red'}
          leftIcon={<Icon as={DeleteIcon}/>}>
          {removeButtonTitle}
        </Button>
      </Stack>

      {isOpen && <CreateCollectionModal isOpen={isOpen} onClose={onClose}/>}
    </>
  );
});

export default ListHeader;

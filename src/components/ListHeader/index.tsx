import React, { FC, ReactElement } from 'react';
import { useCollectionsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { Button, Icon, Stack } from '@chakra-ui/react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  onOpen: () => void;
  createButtonTitle: string;
  removeButtonTitle: string;
  removeButtonHandler: () => void;
}

const ListHeader: FC<Props> = observer((props): ReactElement => {
  const {createButtonTitle, removeButtonTitle, onOpen} = props;
  const collectionsStore = useCollectionsStore();

  return (
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
  );
});

export default ListHeader;

import React, { FC, ReactElement } from 'react';
import ListHeader from '../../components/ListHeader';
import Header from '../../components/Header';
import { useCollectionsStore } from '../../store/hooks';
import { Collection } from '../../store/CollectionsStore';
import { observer } from 'mobx-react-lite';
import { Button, Card, CardBody, Heading, Icon, Stack, StackDivider, Text } from '@chakra-ui/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CollectionsList: FC = observer((): ReactElement => {
  const collectionsStore = useCollectionsStore();

  return (
    <>
      <Header/>

      <Stack
      as={'section'}
      direction={'column'}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
      h={'100%'}>
        <ListHeader
        createButtonTitle={'Create collection'}
        inputLabel={'Collection name'}
        inputPlaceholder={'Enter collection name'}
        removeButtonTitle={'Remove all collections'}
        removeButtonHandler={collectionsStore.removeAllCollections}/>

        {
          collectionsStore.collections.length ?
            <Stack
            as={'ul'}
            direction={'column'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
            w={'100%'}
            h={'100%'}
            p={4}
            overflow={'auto'}
            divider={<StackDivider/>}>
              {
                collectionsStore.collections.map((collection: Collection) => {
                  return <Card as={'li'} key={collection.id} w={'100%'} cursor={'pointer'} title={collection.title}>
                    <CardBody>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Heading as={'h6'} mr={10} noOfLines={1}>
                          {collection.title}
                        </Heading>

                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                          <Button
                          leftIcon={<Icon as={EditIcon}/>}
                          mr={4}>
                            Edit
                          </Button>

                          <Button
                          onClick={() => collectionsStore.removeCollection(collection.id)}
                          leftIcon={<Icon as={DeleteIcon}/>}>
                            Remove
                          </Button>
                        </Stack>
                      </Stack>
                    </CardBody>
                  </Card>;
                })
              }
            </Stack>
            :
            <Stack
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}>
              <Text mb={4}>
                Collections list is empty
              </Text>
            </Stack>
        }
      </Stack>
    </>
  );
});

export default CollectionsList;

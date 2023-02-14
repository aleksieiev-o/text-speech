import React, { FC, ReactElement } from 'react';
import { Spinner, Stack } from '@chakra-ui/react';

const GlobalLoader: FC = (): ReactElement => {
  return (
    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} w={'full'} h={'full'} p={4} overflow={'hidden'}>
      <Spinner thickness={'4px'} speed={'0.75s'} emptyColor={'gray.200'} color={'facebook.600'} size={'xl'}/>
    </Stack>
  );
};

export default GlobalLoader;

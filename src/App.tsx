import React, { FC, ReactElement } from 'react';
import Router from './Router';
import { ChakraProvider, Stack } from '@chakra-ui/react';
import StoreContextProvider from './Providers/StoreContext.provider';
import { theme } from './theme';

const App: FC = (): ReactElement => {
  return (
    <ChakraProvider resetCSS={true} theme={theme} portalZIndex={1}>
      <StoreContextProvider>
        <Stack
        as={'section'}
        direction={'column'}
        w={'100%'}
        h={'100%'}>
          <Router/>
        </Stack>
      </StoreContextProvider>
    </ChakraProvider>
  );
};

export default App;

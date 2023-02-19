import React, { FC, ReactElement } from 'react';
import Router from './Router';
import { ChakraProvider, Stack } from '@chakra-ui/react';
import { theme } from './theme';
import StoreContextProvider from './Providers/StoreContext.provider';
import SpeechUtteranceContextProvider from './Providers/SpeechUtteranceContext.provider';

const App: FC = (): ReactElement => {
  return (
    <ChakraProvider resetCSS={true} theme={theme} portalZIndex={1}>
      <StoreContextProvider>
        <SpeechUtteranceContextProvider>
          <Stack
            as={'section'}
            direction={'column'}
            w={'full'}
            h={'full'}>
            <Router/>
          </Stack>
        </SpeechUtteranceContextProvider>
      </StoreContextProvider>
    </ChakraProvider>
  );
};

export default App;

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

export enum ColorMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

const config: ThemeConfig = {
  initialColorMode: ColorMode.SYSTEM,
  useSystemColorMode: true,
};

export const theme = extendTheme({ config });

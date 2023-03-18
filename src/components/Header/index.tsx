import React, { FC, ReactElement } from 'react';
import { APP_NAME } from '../../utils/constants';
import { useAuthorizationStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../Router';
import { Heading, Icon, IconButton, Stack, useDisclosure, useColorMode } from '@chakra-ui/react';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ActionConfirmationModal, { ActionConfirmationModalType } from '../ActionConfirmation.modal';
import HeaderUserInfo from './HeaderUserInfo';
import { ColorMode } from '../../theme';
import SetAppLang from './SetAppLang';
import { useTranslation } from 'react-i18next';

const Header: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);

  const logoutHandler = async () => {
    try {
      await authorizationStore.singOutEmailAndPassword();
      navigate(PublicRoutes.SIGN_IN);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <Stack
        as={'header'}
        direction={'row'}
        w={'full'}
        alignItems={'center'}
        justifyContent={'space-between'}
        boxShadow={'md'}
        p={4}>
        <Heading
          as={'h4'}
          color={colorMode === ColorMode.LIGHT ? 'telegram.600' : 'white'}
          fontSize={{ md: 32, base: 22 }}
          cursor={'default'}>
          {APP_NAME}
        </Heading>

        {
          authorizationStore.isAuth &&
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={6}>
            <HeaderUserInfo/>

            <SetAppLang/>

            {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
            <IconButton
              onClick={toggleColorMode}
              colorScheme={'gray'}
              variant={'outline'}
              title={colorMode === ColorMode.LIGHT ? t('common_set_dark_theme_title')! : t('common_set_light_theme_title')!}
              aria-label={colorMode === ColorMode.LIGHT ? 'Set dark theme' : 'Set light theme'}
              icon={<Icon as={colorMode === ColorMode.LIGHT ? DarkModeIcon : LightModeIcon}/>}/>

            <IconButton
              onClick={onOpen}
              colorScheme={'gray'}
              variant={'outline'}
              title={t('common_logout_btn')!}
              aria-label={'Logout'}
              icon={<Icon as={LogoutIcon}/>}/>
            {/* eslint-enable */}
          </Stack>
        }
      </Stack>

      {
        isOpen &&
        <ActionConfirmationModal
          actionHandler={logoutHandler}
          isOpen={isOpen}
          onClose={onClose}
          modalType={ActionConfirmationModalType.WARNING}
          modalTitle={t('common_logout_confirm_title')}
          modalBodyDescription={t('common_logout_confirm_message')}
          modalBodyQuestion={t('common_confirm_question')}
          buttonText={t('common_logout_btn')}/>
      }
      {/* eslint-enable */}
    </>
  );
});

export default Header;

import React, { FC, ReactElement } from 'react';
import { APP_NAME } from '../../utils/constants';
import { useAuthorizationStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../Router';
import { Heading, Icon, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
import LogoutIcon from '@mui/icons-material/Logout';
import ActionConfirmationModal, { ActionConfirmationModalType } from '../ActionConfirmation.modal';
import HeaderUserInfo from './HeaderUserInfo';

const Header: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // const startSpeech = () => {
  //   speechUtterance.start('Du musstest auf sie noch warten und nirgendwohin gehen, weil sie vor einer Stunde am Bahnhof angekommen war.');
  // };
  //
  // const pauseSpeech = () => {
  //   speechUtterance.pause();
  // };
  //
  // const resumeSpeech = () => {
  //   speechUtterance.resume();
  // };
  //
  // const cancelSpeech = () => {
  //   speechUtterance.stop();
  // };

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
        <Heading as={'h4'} color={'facebook.600'} cursor={'default'}>{APP_NAME}</Heading>
        {/*<Button onClick={startSpeech}>speech</Button>*/}
        {/*<Button onClick={pauseSpeech}>pause</Button>*/}
        {/*<Button onClick={resumeSpeech}>resume</Button>*/}
        {/*<Button onClick={cancelSpeech}>cancel</Button>*/}

        {
          authorizationStore.isAuth &&
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={6}>
            <HeaderUserInfo/>

            <IconButton
              onClick={onOpen}
              colorScheme={'gray'}
              variant={'outline'}
              title={'Log out'}
              aria-label={'Log out'}
              icon={<Icon as={LogoutIcon}/>}/>
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
          modalTitle={'Logout confirmation'}
          modalBodyDescription={'You are about to log out.'}
          modalBodyQuestion={'Are you cure?'}
          buttonText={'Logout'}/>
      }
    </>
  );
});

export default Header;

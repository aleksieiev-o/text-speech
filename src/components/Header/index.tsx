import React, { FC, ReactElement } from 'react';
import { APP_NAME } from '../../utils/constants';
import { useAuthorizationStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../Router';
import { Button, Heading, Icon, Stack, useDisclosure } from '@chakra-ui/react';
import LogoutIcon from '@mui/icons-material/Logout';
import ActionConfirmationModal, { ActionConfirmationModalType } from '../ActionConfirmation.modal';

const Header: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

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

        {
          authorizationStore.isAuth &&
          <Button onClick={onOpen} colorScheme={'gray'} variant={'outline'} rightIcon={<Icon as={LogoutIcon}/>}>Logout</Button>
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

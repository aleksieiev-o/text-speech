import React, { FC, ReactElement } from 'react';
import { APP_NAME } from '../../utils/constants';
import { useAuthorizationStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../Router';
import { Button, Heading, Icon, Stack } from '@chakra-ui/react';
import LogoutIcon from '@mui/icons-material/Logout';

const Header: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
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
    <Stack
    as={'header'}
    direction={'row'}
    w={'100%'}
    alignItems={'center'}
    justifyContent={'space-between'}
    p={4}>
      <Heading as={'h4'}>
        {APP_NAME}
      </Heading>

      {
        authorizationStore.isAuth &&
        <Button
        rightIcon={<Icon as={LogoutIcon}/>}
        onClick={logoutHandler}>
          Logout
        </Button>
      }
    </Stack>
  );
});

export default Header;

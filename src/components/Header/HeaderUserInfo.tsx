import React, { FC, ReactElement } from 'react';
import { Avatar, Icon, Link, Stack, Text } from '@chakra-ui/react';
import PersonIcon from '@mui/icons-material/Person';
import { observer } from 'mobx-react-lite';
import { useAuthorizationStore } from '../../store/hooks';
import { Link as RouterLink } from 'react-router-dom';
import { ProtectedRoutes } from '../../Router';

const HeaderUserInfo: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();

  return (
    <Link as={RouterLink} to={ProtectedRoutes.SETTINGS}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={4}>
        <Stack direction={'column'} alignItems={'flex-end'} justifyContent={'center'} spacing={0}>
          <Text>{authorizationStore.user.displayName}</Text>

          <Text>{authorizationStore.user.email}</Text>
        </Stack>

        <Avatar src={authorizationStore.user.photoURL || ''} bg={'telegram.600'} icon={<Icon as={PersonIcon}/>}/>
      </Stack>
    </Link>
  );
});

export default HeaderUserInfo;

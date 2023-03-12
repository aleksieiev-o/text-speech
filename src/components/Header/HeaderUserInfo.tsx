import React, { FC, ReactElement } from 'react';
import { Avatar, Icon, Stack, Text } from '@chakra-ui/react';
import PersonIcon from '@mui/icons-material/Person';
import { observer } from 'mobx-react-lite';
import { useAuthorizationStore } from '../../store/hooks';

const HeaderUserInfo: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={4}>
      <Stack direction={'column'} alignItems={'flex-end'} justifyContent={'center'} spacing={0}>
        <Text>{authorizationStore.user.displayName || 'User'}</Text>

        <Text>{authorizationStore.user.email}</Text>
      </Stack>

      <Avatar src={authorizationStore.user.photoURL || ''} bg={'telegram.600'} icon={<Icon as={PersonIcon}/>}/>
    </Stack>
  );
});

export default HeaderUserInfo;

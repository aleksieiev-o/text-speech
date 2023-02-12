import React, { FC, ReactElement } from 'react';
import { Avatar, Icon, Stack, Text } from '@chakra-ui/react';
import PersonIcon from '@mui/icons-material/Person';
import { observer } from 'mobx-react-lite';

const HeaderUserInfo: FC = observer((): ReactElement => {
  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={4}>
      <Stack direction={'column'} alignItems={'flex-end'} justifyContent={'center'} spacing={0}>
        <Text>Display name</Text>

        <Text>Email</Text>
      </Stack>

      <Avatar src={''} bg={'facebook.600'} icon={<Icon as={PersonIcon}/>}/>
    </Stack>
  );
});

export default HeaderUserInfo;

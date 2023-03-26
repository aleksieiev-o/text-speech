import React, { FC, ReactElement, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header';
import { Button, Checkbox, Container, Divider, Heading, Icon, Input, Stack, Text } from '@chakra-ui/react';
import ButtonBack from '../../components/ButtonBack';
import { useAuthorizationStore, useSettingsStore } from '../../store/hooks';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { inputChangeHandler } from '../../utils/inputChangeHandler';

const Settings: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const settingsStore = useSettingsStore();
  const [userName, setUserName] = useState<string>(authorizationStore.user.displayName || '');
  const [userEmail, setUserEmail] = useState<string>(authorizationStore.user.email || '');
  // const [userPhone, setUserPhone] = useState<string>(authorizationStore.user.phoneNumber || '');

  return (
    <>
      <Header/>

      <Stack w={'full'} h={'full'} direction={'column'} alignItems={'center'} justifyContent={'center'} overflowY={'hidden'}>
        <Stack w={'full'} boxShadow={'md'} mb={4} p={4}>
          <ButtonBack to={-1}/>
        </Stack>

        <Stack direction={'column'} w={'full'} h={'full'} overflowY={'auto'}>
          {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
          <Container centerContent={true} w={'full'} maxW={'3xl'} p={4}>
            <Stack direction={'column'} w={'full'} alignItems={'flex-start'} justifyContent={'flex-start'} spacing={8}>
              <Heading as={'h5'} noOfLines={1} fontSize={{ md: 24, base: 18 }}>
                Settings
              </Heading>

              <Heading as={'h6'} noOfLines={1} fontSize={{ md: 18, base: 16 }}>
                User settings
              </Heading>

              <Stack direction={'row'} w={'full'} spacing={4}>
                <Divider orientation={'vertical'} color={'gray.400'}/>

                <Stack direction={'column'} w={'full'} alignItems={'flex-start'} justifyContent={'flex-start'} spacing={4}>
                  <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={6}>
                    <Text as={'strong'}>User ID:</Text>

                    <Text>{authorizationStore.user.uid || '-'}</Text>
                  </Stack>

                  <form id={'settings-edit-display-name'} style={{ width: '100%' }}>
                    <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={6}>
                      <Text as={'strong'}>User name:</Text>

                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={4}>
                        <Input onChange={(e) => inputChangeHandler(e, setUserName)} value={userName} placeholder={'User name'}/>

                        <Button form={'settings-edit-display-name'} type={'submit'} colorScheme={'telegram'}>Save</Button>
                      </Stack>
                    </Stack>
                  </form>

                  <form id={'settings-edit-email'} style={{ width: '100%' }}>
                    <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={6}>
                      <Text as={'strong'}>User e-mail:</Text>

                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={4}>
                        <Input onChange={(e) => inputChangeHandler(e, setUserEmail)} value={userEmail} placeholder={'User e-mail'}/>

                        <Button form={'settings-edit-email'} type={'submit'} colorScheme={'telegram'}>Save</Button>
                      </Stack>
                    </Stack>
                  </form>

                  <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={6}>
                    <Text as={'strong'}>User e-mail is verified:</Text>

                    <Icon as={authorizationStore.user.emailVerified ? CheckIcon : CloseIcon} color={authorizationStore.user.emailVerified ? 'telegram.600' : 'red.600'}/>
                  </Stack>

                  {/*<form id={'settings-edit-phone'} style={{ width: '100%' }}>
                    <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={6}>
                      <Text as={'strong'}>User phone:</Text>

                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={4}>
                        <Input onChange={(e) => inputChangeHandler(e, setUserPhone)} value={userPhone} placeholder={'User phone'}/>

                        <Button form={'settings-edit-phone'} type={'submit'} colorScheme={'telegram'}>Save</Button>
                      </Stack>
                    </Stack>
                  </form>*/}

                  {/*<Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={6}>
                    <Text as={'strong'}>User avatar:</Text>

                    <Button colorScheme={'telegram'}>Edit user avatar</Button>
                  </Stack>*/}
                </Stack>
              </Stack>

              <Heading as={'h6'} noOfLines={1} fontSize={{ md: 18, base: 16 }}>
                Application settings
              </Heading>

              <Stack direction={'row'} spacing={4}>
                <Divider orientation={'vertical'} color={'gray.400'}/>

                <Stack direction={'column'} alignItems={'flex-start'} justifyContent={'flex-start'} spacing={4}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={6}>
                    <Text as={'strong'}>Text preview visibility:</Text>

                    <Checkbox
                      onChange={() => settingsStore.updatePreviewText(!settingsStore.hidePreviewText)}
                      isChecked={settingsStore.hidePreviewText}
                      colorScheme={'telegram'}
                      title={'Text preview visibility'}
                      borderColor={'gray.400'}
                      boxShadow={'md'}/>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Container>
          {/* eslint-enable */}
        </Stack>
      </Stack>
    </>
  );
});

export default Settings;

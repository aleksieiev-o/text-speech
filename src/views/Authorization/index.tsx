import React, { FC, FormEvent, ReactElement, useState } from 'react';
import { useAuthorizationStore } from '../../store/hooks';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthRouteCondition } from './useAuthRouteCondition';
import { ProtectedRoutes, PublicRoutes } from '../../Router';
import Header from '../../components/Header';
import { Box, Button, FormControl, FormLabel, Heading, Icon, IconButton, Input, InputGroup, InputRightElement, Link, Stack, Text } from '@chakra-ui/react';
import { inputChangeHandler } from '../../utils/inputChangeHandler';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Authorization: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const isSignInRoute = useAuthRouteCondition();
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isSignInRoute) {
        await authorizationStore.signInEmailPassword(email, password);
      } else {
        await authorizationStore.singUpEmailAndPassword(email, password);
      }

      navigate(ProtectedRoutes.COLLECTIONS);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <Header/>

      <Stack
      as={'section'}
      w={'full'}
      h={'full'}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      p={4}
      spacing={8}>
        <Box p={4} boxShadow={'xl'} maxW={'lg'} w={'full'}>
          <Heading as={'h6'} mb={6}>
            {isSignInRoute ? 'Sign In' : 'Sign Up'}
          </Heading>

          <form onSubmit={(e) => submitHandler(e)}>
            <Stack
              w={'full'}
              h={'full'}
              direction={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              spacing={4}>
              <FormControl>
                <FormLabel>
                  E-mail
                </FormLabel>

                <Input
                  onChange={(e) => inputChangeHandler(e, setEmail)}
                  value={email}
                  placeholder={'Enter E-mail'}
                  type="email"
                  name={'email'}
                  autoFocus={true}/>
              </FormControl>

              <FormControl>
                <FormLabel>
                  Password
                </FormLabel>

                <InputGroup>
                  <Input
                    onChange={(e) => inputChangeHandler(e, setPassword)}
                    value={password}
                    placeholder={'Enter password'}
                    type={showPassword ? 'text' : 'password'}
                    name={'password'}/>

                  <InputRightElement>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      variant={'link'}
                      icon={<Icon as={showPassword ? VisibilityOffIcon : VisibilityIcon}/>}
                      aria-label={'password visibility'}/>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Text mr={2}>
                  {isSignInRoute ? `I don't have an account.` : `I already have an account.`}
                </Text>

                <Link
                  as={RouterLink}
                  to={isSignInRoute ? PublicRoutes.SIGN_UP : PublicRoutes.SIGN_IN}>
                  {isSignInRoute ? 'Sign Up' : 'Sign In'}
                </Link>
              </Stack>

              <Button
                type={'submit'}
                w={'full'}>
                {isSignInRoute ? 'Sign In' : 'Sign Up'}
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </>
  );
});

export default Authorization;

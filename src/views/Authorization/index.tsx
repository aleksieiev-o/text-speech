import React, { FC, ReactElement, useState } from 'react';
import { useAuthorizationStore } from '../../store/hooks';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthRouteCondition } from '../../hooks/useAuthRouteCondition';
import { ProtectedRoutes, PublicRoutes } from '../../Router';
import Header from '../../components/Header';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Icon, IconButton, Input, InputGroup, InputRightElement, Link, Stack, Text } from '@chakra-ui/react';
import { object, string } from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { AuthRequestDto } from '../../store/AuthorizationStore';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLoading } from '../../hooks/useLoading';
import { useTranslation } from 'react-i18next';

const initialValues: AuthRequestDto = {
  email: '',
  password: '',
};

const validationSchema = object().shape({
  email: string().required('Email is required').email('Invalid email value').min(3, 'E-mail must be at least 3 characters').max(255, 'E-mail must be maximum 255 characters'),
  password: string().required('Password is required').min(6, 'Password must be at least 6 characters').max(20, 'Password must be maximum 20 characters'),
});

const Authorization: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { isLoading, setIsLoading } = useLoading();
  const isSignInRoute = useAuthRouteCondition();
  const navigate = useNavigate();
  const { t } = useTranslation(['authorization']);

  const submitHandler = async (payload: AuthRequestDto, formikHelpers: FormikHelpers<AuthRequestDto>) => {
    setIsLoading(true);

    try {
      if (isSignInRoute) {
        await authorizationStore.signInEmailPassword(payload);
        formikHelpers.setSubmitting(false);
        navigate(ProtectedRoutes.COLLECTIONS);
      } else {
        await authorizationStore.singUpEmailAndPassword(payload);
        formikHelpers.setSubmitting(false);
        navigate(ProtectedRoutes.COLLECTIONS);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
    validateOnBlur: true,
  });
  const { touched, dirty, errors, getFieldProps } = formik;

  return (
    <>
      <Header />

      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <Stack as={'section'} w={'full'} h={'full'} direction={'column'} alignItems={'center'} justifyContent={'center'} p={4} spacing={8}>
        <Box p={4} boxShadow={'xl'} maxW={'lg'} w={'full'}>
          <Heading as={'h5'} mb={6} color={isSignInRoute ? 'telegram.600' : 'telegram.600'}>
            {isSignInRoute
              ? t('authorization_sign_in', { ns: 'authorization' })
              : t('authorization_sign_up', { ns: 'authorization' })}
          </Heading>

          <form onSubmit={formik.handleSubmit}>
            <Stack w={'full'} h={'full'} direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={4}>
              <FormControl isRequired={true} isReadOnly={isLoading} isInvalid={touched.email && dirty && Boolean(errors.email)}>
                <FormLabel>
                  {t('authorization_email_label', { ns: 'authorization' })}
                </FormLabel>

                <Input
                  placeholder={t('authorization_email_placeholder', { ns: 'authorization' })!}
                  type="email"
                  autoFocus={true}
                  {...getFieldProps('email')} />

                {touched.email && dirty && Boolean(errors.email) && <FormErrorMessage>{touched.email && dirty && errors.email}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired={true} isReadOnly={isLoading} isInvalid={touched.password && dirty && Boolean(errors.password)}>
                <FormLabel>
                  {t('authorization_password_label', { ns: 'authorization' })!}
                </FormLabel>

                <InputGroup>
                  <Input
                    placeholder={t('authorization_password_placeholder', { ns: 'authorization' })!}
                    type={showPassword ? 'text' : 'password'}
                    {...getFieldProps('password')} />

                  <InputRightElement>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      isDisabled={isLoading}
                      variant={'link'}
                      icon={<Icon as={showPassword ? VisibilityOffIcon : VisibilityIcon} />}
                      aria-label={'password visibility'}
                    />
                  </InputRightElement>
                </InputGroup>

                {touched.password && dirty && Boolean(errors.password) && <FormErrorMessage>{touched.password && dirty && errors.password}</FormErrorMessage>}
              </FormControl>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <Text mr={2}>{isSignInRoute
                  ? t('authorization_not_have_acc_message', { ns: 'authorization' })!
                  : t('authorization_have_acc_message', { ns: 'authorization' })!}</Text>

                <Link as={RouterLink} to={isSignInRoute ? PublicRoutes.SIGN_UP : PublicRoutes.SIGN_IN} color={isSignInRoute ? 'telegram.600' : 'telegram.600'}>
                  {isSignInRoute
                    ? t('authorization_sign_up', { ns: 'authorization' })
                    : t('authorization_sign_in', { ns: 'authorization' })}
                </Link>
              </Stack>

              <Button type={'submit'} isLoading={isLoading} colorScheme={isSignInRoute ? 'telegram' : 'telegram'} variant={'outline'} w={'full'}>
                {isSignInRoute
                  ? t('authorization_sign_in', { ns: 'authorization' })
                  : t('authorization_sign_up', { ns: 'authorization' })}
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      {/* eslint-enable */}
    </>
  );
});

export default Authorization;

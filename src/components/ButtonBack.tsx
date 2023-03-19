import React, { FC, ReactElement } from 'react';
import { Button, Icon } from '@chakra-ui/react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ProtectedRoutes } from '../Router';

interface Props {
  to: ProtectedRoutes | -1
}

const ButtonBack: FC<Props> = ({ to }): ReactElement => {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  return (
    <Button
      onClick={() => navigate(to as ProtectedRoutes)}
      mr={'auto'}
      colorScheme={'gray'}
      variant={'outline'}
      title={t('common_back_btn')!}
      leftIcon={<Icon as={ArrowBackIosIcon}/>}>
      {t('common_back_btn')}
    </Button>
  );
  /* eslint-enable */
};

export default ButtonBack;

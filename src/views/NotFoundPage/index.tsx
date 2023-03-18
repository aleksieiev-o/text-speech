import React, { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorizationStore } from '../../store/hooks';
import { ProtectedRoutes, PublicRoutes } from '../../Router';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

const NotFoundPage: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);

  return (
    <div>
      <h1>
        {t('common_404_page_message')}
      </h1>

      <button onClick={() => navigate(authorizationStore.isAuth ? ProtectedRoutes.COLLECTIONS : PublicRoutes.SIGN_IN)}>
        {t('common_404_page_btn')}
      </button>
    </div>
  );
});

export default NotFoundPage;

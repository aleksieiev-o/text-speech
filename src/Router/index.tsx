import React, { FC, ReactElement } from 'react';
import { useAuthorizationStore } from '../store/hooks';
import { observer } from 'mobx-react-lite';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import CollectionsList from '../views/CollectionsList';
import CardsList from '../views/CardsList';
import CollectionCard from '../views/CollectionCard';
import Authorization from '../views/Authorization';

export enum PublicRoutes {
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
}

export enum ProtectedRoutes {
  COLLECTIONS = '/collections',
  COLLECTION_ID = '/collections/:collectionId',
  CARD_ID = '/collections/:collectionId/:cardId',
}

const publicRoutes = createBrowserRouter([
  { path: PublicRoutes.SIGN_IN, element: <Authorization/> },
  { path: PublicRoutes.SIGN_UP, element: <Authorization/> },
  { path: '*', element: <Navigate to={PublicRoutes.SIGN_IN} replace={true}/> },
]);

const protectedRoutes = createBrowserRouter([
  { path: ProtectedRoutes.COLLECTIONS, element: <CollectionsList/> },
  { path: ProtectedRoutes.COLLECTION_ID, element: <CardsList/> },
  { path: ProtectedRoutes.CARD_ID, element: <CollectionCard/> },
  { path: '*', element: <Navigate to={ProtectedRoutes.COLLECTIONS} replace={true}/> },
]);

const Router: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();

  return (
    <RouterProvider router={authorizationStore.isAuth ? protectedRoutes : publicRoutes}/>
  );
});

export default Router;

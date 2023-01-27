import React, { FC, ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CollectionsList from '../views/CollectionsList';
import CardsList from '../views/CardsList';

export enum ProtectedRoutes {
  COLLECTIONS = 'collections',
  COLLECTIONS_ID = 'collections/:id',
}

const ProtectedRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path={ProtectedRoutes.COLLECTIONS} element={<CollectionsList/>}/>
      <Route path={ProtectedRoutes.COLLECTIONS_ID} element={<CardsList/>}/>

      <Route path="*" element={<Navigate to={ProtectedRoutes.COLLECTIONS} replace={true}/>}/>
    </Routes>
  );
};

export default ProtectedRouter;

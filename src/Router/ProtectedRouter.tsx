import React, { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import CollectionsList from '../views/CollectionsList';
import CardsList from '../views/CardsList';

const ProtectedRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path={'collections'} element={<CollectionsList/>}/>
      <Route path={'collections/:id'} element={<CardsList/>}/>

      {/*<Route path="*" element={<Navigate to={'collections'} replace={true}/>}/>*/}
    </Routes>
  );
};

export default ProtectedRouter;

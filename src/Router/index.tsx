import React, { FC, ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import CollectionsList from '../views/CollectionsList';
import CardsList from '../views/CardsList';

const Router: FC = (): ReactElement => {
  return (
    <>
      <Header/>

      <Routes>
        <Route path={'collections'} element={<CollectionsList/>}/>
        <Route path={'collections/:id'} element={<CardsList/>}/>

        <Route path="*" element={<Navigate to={'collections'} replace={true}/>}/>
      </Routes>
    </>
  );
};

export default Router;

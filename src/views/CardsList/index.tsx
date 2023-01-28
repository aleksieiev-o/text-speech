import React, { FC, ReactElement } from 'react';
import Header from '../../components/Header';
import ListHeader from '../../components/ListHeader';

const CardsList: FC = (): ReactElement => {
  return (
    <>
      <Header/>

      <div>
        <ListHeader
          createButtonTitle={'Create card'}
          removeButtonTitle={'Remove all cards'}/>

        <ul>
          <li>
            <span>1</span>
            <button>Edit</button>
            <button>Remove</button>
          </li>
          <li>
            <span>2</span>
            <button>Edit</button>
            <button>Remove</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CardsList;

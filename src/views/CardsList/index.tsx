import React, { FC, ReactElement } from 'react';
import Header from '../../components/Header';
import ListHeader from '../../components/ListHeader';

const CardsList: FC = (): ReactElement => {
  const removeAllCards = () => {
    // eslint-disable-next-line no-console
    console.log(111);
  };

  return (
    <>
      <Header/>

      <div>
        <ListHeader
          createButtonTitle={'Create card'}
          inputLabel={'CollectionCard name'}
          inputPlaceholder={'Enter card name'}
          removeButtonTitle={'Remove all cards'}
          removeButtonHandler={removeAllCards}/>

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

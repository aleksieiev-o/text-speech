import React, { FC, ReactElement } from 'react';

interface Props {
  createButtonTitle: string;
  // createButtonHandler: () => void;
  removeButtonTitle: string;
  // removeButtonHandler: () => void;
}

const ListHeader: FC<Props> = (props): ReactElement => {
  const {createButtonTitle, removeButtonTitle} = props;

  return (
    <div>
      <button name={createButtonTitle}>
        {createButtonTitle}
      </button>

      <button name={removeButtonTitle}>
        {removeButtonTitle}
      </button>
    </div>
  );
};

export default ListHeader;

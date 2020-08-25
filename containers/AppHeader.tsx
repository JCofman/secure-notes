import React from 'react';

import { PrimaryButton } from 'react-components/components/button';
import Header from 'react-components/components/header/Header';

interface AppHeaderProps {
  isEditing: boolean;
  onCreateNewNote: () => void;
}

const AppHeader = (props: AppHeaderProps) => {
  const { isEditing, onCreateNewNote } = props;

  return (
    <Header className='toolbar flex flex-items-center'>
      <PrimaryButton className='ml1' icon='add' disabled={isEditing} onClick={onCreateNewNote}>
        {' '}
        New note
      </PrimaryButton>
    </Header>
  );
};

export default AppHeader;

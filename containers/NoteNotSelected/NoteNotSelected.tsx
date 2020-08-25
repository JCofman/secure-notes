import React from 'react';

import { Icon } from 'react-components/components/icon';

const NoteNotSelected = () => {
    return (
        <div className="h100 flex flex-justify-center flex-items-center">
            <Icon name="on" />
            <p>Select a note to view</p>
        </div>
    );
};

export default NoteNotSelected;

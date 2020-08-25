import React from 'react';

import { Icon } from 'react-components/components/icon';

function NoteListEmpty() {
    return (
        <div className="h100 flex flex-justify-center flex-items-center">
            <Icon name="list" />
            <p>Add first note by clicking &quot;New Note&quot;</p>
        </div>
    );
}

export default NoteListEmpty;

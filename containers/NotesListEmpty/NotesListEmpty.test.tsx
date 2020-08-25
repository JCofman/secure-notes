import React from 'react';
import { render } from '@testing-library/react';

import NotesListEmpty from './NotesListEmpty';

test(`NotesListEmpty should render info text`, () => {
    const screen = render(<NotesListEmpty />);
    screen.getByText(/add first note by clicking "new note"/i);
});

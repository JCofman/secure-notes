import React from 'react';
import { render, screen } from '@testing-library/react';

import NotesListEmpty from './NotesListEmpty';

test(`NotesListEmpty should render info text`, () => {
    render(<NotesListEmpty />);
    screen.getByText(/add first note by clicking/i);
});

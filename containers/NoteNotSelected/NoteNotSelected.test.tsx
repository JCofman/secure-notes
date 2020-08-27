import React from 'react';
import { render, screen } from '@testing-library/react';

import NoteNotSelected from './NoteNotSelected';

test(`NoteNotSelected should render info text`, () => {
    render(<NoteNotSelected />);
    screen.getByText(/select a note to view/i);
});

import React from 'react';
import { render } from '@testing-library/react';

import NoteNotSelected from './NoteNotSelected';

test(`NoteNotSelected should render info text`, () => {
    const screen = render(<NoteNotSelected />);
    screen.getByText(/select a note to view/i);
});

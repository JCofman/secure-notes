import React from 'react';
import { render, screen } from '@testing-library/react';

import Home from '../pages';

test(`Home should render with no note message`, () => {
    render(<Home />);
    screen.getByRole('button', { name: /new note/i });
    screen.getByText(/add first note by clicking/i);
    screen.getByText(/select a note to view/i);
});

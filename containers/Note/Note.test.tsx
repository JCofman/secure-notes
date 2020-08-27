import React from 'react';
import { screen, render } from '@testing-library/react';

import Note from './Note';

test(`Note should render note content areas`, () => {
    render(<Note titleArea={'First Note'} contentArea={<p>text</p>} controlsArea={<button>add</button>} />);
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
    expect(screen.getByRole('button')).toHaveTextContent(/add/i);
    expect(screen.getByText(/text/i));
    expect(screen.getByText(/First Note/i));
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AppHeader from './AppHeader';

test(`AppHeader is rendered properly`, () => {
    const { container } = render(
        <AppHeader
            isEditing={false}
            onCreateNewNote={() => {
                // do nothing.
            }}
        />
    );
    expect(container).toMatchSnapshot();
});
test(`AppHeader onClick new note should be handled`, () => {
    const mockedHandleCreateNewNote = jest.fn();

    render(<AppHeader isEditing={false} onCreateNewNote={mockedHandleCreateNewNote} />);
    const button = screen.getByRole('button', { name: /new note/i });
    userEvent.click(button);

    expect(mockedHandleCreateNewNote).toHaveBeenCalledTimes(1);
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NotesRendered from './NotesRendered';

const note = { id: '1', title: 'decrypted content', content: '' };
test(`NotesRendered should render edit button`, () => {
    render(
        <NotesRendered
            note={note}
            decryptedContent={'some decrypted content'}
            isDecrypting={false}
            onEdit={() => {
                /** do nothing */
            }}
        />
    );
    screen.getByText(/some decrypted content/i);
    screen.getByText(/edit/i);
});

test(`NotesRendered should trigger events on button click`, () => {
    const handleEditMock = jest.fn();
    render(
        <NotesRendered
            note={note}
            decryptedContent={'some decrypted content'}
            isDecrypting={false}
            onEdit={handleEditMock}
        />
    );
    screen.getByText(/some decrypted content/i);

    userEvent.click(screen.getByText(/edit/i));

    expect(handleEditMock).toHaveBeenCalledTimes(1);
});

test(`NotesRendered edit button should not be clickable during decryption`, () => {
    const handleEditMock = jest.fn();

    render(
        <NotesRendered
            note={note}
            decryptedContent={'some decrypted content'}
            isDecrypting={true}
            onEdit={handleEditMock}
        />
    );
    screen.getByText(/loading/i);

    userEvent.click(screen.getByText(/edit/i));

    expect(handleEditMock).toHaveBeenCalledTimes(0);
});

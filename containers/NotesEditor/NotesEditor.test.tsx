import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NotesEditor from './NotesEditor';

const note = { id: '1', title: 'decrypted content', content: '' };
test(`NotesEditor should render note areas and action buttons`, () => {
    render(
        <NotesEditor
            note={note}
            decryptedContent={'some decrypted content'}
            isEncrypting={false}
            onSave={() => {
                /** do nothing */
            }}
            onDelete={() => {
                /** do nothing */
            }}
            onCancel={() => {
                /** do nothing */
            }}
        />
    );
    screen.getByText(/some decrypted content/i);
    screen.getByText(/cancel/i);
    screen.getByText(/delete/i);
    screen.getByText(/save/i);
});

test(`NotesEditor should trigger events on button click`, () => {
    const handleDeleteMock = jest.fn();
    const handleSaveMock = jest.fn();
    const handleCancelMock = jest.fn();
    render(
        <NotesEditor
            note={note}
            decryptedContent={'some decrypted content'}
            isEncrypting={false}
            onSave={handleSaveMock}
            onDelete={handleDeleteMock}
            onCancel={handleCancelMock}
        />
    );
    screen.getByText(/some decrypted content/i);

    userEvent.click(screen.getByText(/cancel/i));
    userEvent.click(screen.getByText(/delete/i));
    userEvent.click(screen.getByText(/save/i));

    expect(handleDeleteMock).toHaveBeenCalledTimes(1);
    expect(handleSaveMock).toHaveBeenCalledTimes(1);
    expect(handleCancelMock).toHaveBeenCalledTimes(1);
});

test(`NotesEditor event buttons should not be clickable during encryption`, () => {
    const handleDeleteMock = jest.fn();
    const handleSaveMock = jest.fn();
    const handleCancelMock = jest.fn();
    render(
        <NotesEditor
            note={note}
            decryptedContent={'some decrypted content'}
            isEncrypting={true}
            onSave={handleSaveMock}
            onDelete={handleDeleteMock}
            onCancel={handleCancelMock}
        />
    );
    screen.getByText(/some decrypted content/i);

    userEvent.click(screen.getByText(/cancel/i));
    userEvent.click(screen.getByText(/delete/i));
    userEvent.click(screen.getByText(/save/i));

    expect(handleDeleteMock).toHaveBeenCalledTimes(0);
    expect(handleSaveMock).toHaveBeenCalledTimes(0);
    expect(handleCancelMock).toHaveBeenCalledTimes(0);
});

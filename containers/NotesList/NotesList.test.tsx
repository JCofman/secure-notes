import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NotesList from './NotesList';

// mock autosizer to display list item
jest.mock('react-virtualized-auto-sizer', () => ({ children }: any) => children({ height: 600, width: 600 }));

const notes = {
    '1': { id: '1', title: 'New note', content: 'this is a note' },
    '2': { id: '1', title: 'Second note', content: 'my second note' },
};

test(`NotesList should render note items`, () => {
    render(
        <NotesList
            notes={notes}
            selectedNoteId={null}
            onSelectNote={() => {
                /**do nothing */
            }}
            isEditing={true}
        />
    );
    screen.getByText(/New note/i);
    screen.getByText(/Second note/i);
});

test(`NotesListItem should trigger select Note function`, () => {
    const mockedOnSelectNote = jest.fn();
    const screen = render(
        <NotesList notes={notes} selectedNoteId={null} onSelectNote={mockedOnSelectNote} isEditing={false} />
    );

    userEvent.click(screen.getByRole('button', { name: /new note/i }));

    expect(mockedOnSelectNote).toHaveBeenCalledTimes(1);
});
test(`NotesListItem should not trigger select when editing mode is active`, () => {
    const mockedOnSelectNote = jest.fn();
    const screen = render(
        <NotesList notes={notes} selectedNoteId={null} onSelectNote={mockedOnSelectNote} isEditing={true} />
    );

    userEvent.click(screen.getByRole('button', { name: /new note/i }));

    expect(mockedOnSelectNote).toHaveBeenCalledTimes(0);
});

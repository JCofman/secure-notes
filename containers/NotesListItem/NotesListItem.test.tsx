import React from 'react';
import { render, screen } from '@testing-library/react';

import NotesListItem from './NotesListItem';

test(`NotesListItem should render properly`, () => {
    render(
        <NotesListItem
            title="Thats a note"
            key="id"
            selected={false}
            disabled={false}
            onClick={() => {
                /** do nothing */
            }}
        />
    );
    screen.getByText(/Thats a note/i);
});

test(`NotesListItem should set selected class when selected`, () => {
    const selected = true;
    render(
        <NotesListItem
            title="Thats a note"
            key="id"
            selected={selected}
            disabled={false}
            onClick={() => {
                /** do nothing */
            }}
        />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('notesListItem__button__selected');
});

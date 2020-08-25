import React from 'react';

import NotesListItem from '../NotesListItem';
import List from '../List';
import { NotesType } from '../../pages/index';
import { NoteType } from '../../helpers/utils';

interface NotesListType {
    notes: NotesType;
    selectedNoteId: string;
    onSelectNote: (noteId: string) => void;
    isEditing: boolean;
}

const NotesList = (props: NotesListType) => {
    const { notes, selectedNoteId, onSelectNote, isEditing } = props;
    return (
        <List>
            {Object.values(notes).map((note: NoteType) => (
                <NotesListItem
                    key={note.id}
                    title={note.title}
                    selected={note.id === selectedNoteId}
                    disabled={isEditing}
                    onClick={() => onSelectNote(note.id)}
                />
            ))}
        </List>
    );
};

export default NotesList;

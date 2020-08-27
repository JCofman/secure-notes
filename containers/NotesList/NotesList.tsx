import React from 'react';
import { FixedSizeList, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

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

/**
 * memoize rendered item to avoid unnecessary rerenders
 */
const Row = React.memo(
    ({
        data,
        index,
        style,
    }: {
        data: { selectedNoteId: string; notes: NoteType[]; onSelectNote: (noteId: string) => void; isEditing: boolean };
        index: number;
        style: React.CSSProperties;
    }) => {
        const { notes, selectedNoteId, onSelectNote, isEditing } = data;
        return (
            <div key={notes[index].id} style={style}>
                <NotesListItem
                    title={notes[index].title}
                    selected={notes[index].id === selectedNoteId}
                    disabled={isEditing}
                    onClick={() => onSelectNote(notes[index].id)}
                />
            </div>
        );
    },
    areEqual
);

const NotesList = (props: NotesListType) => {
    const { notes, selectedNoteId, onSelectNote, isEditing } = props;
    const noteValues = Object.values(notes).reverse();
    return (
        <AutoSizer>
            {({ width, height }) => (
                <List>
                    <FixedSizeList
                        itemData={{ selectedNoteId, onSelectNote, isEditing, notes: noteValues }}
                        height={height}
                        itemCount={noteValues.length}
                        itemSize={64}
                        width={width}
                    >
                        {Row}
                    </FixedSizeList>
                </List>
            )}
        </AutoSizer>
    );
};

export default NotesList;

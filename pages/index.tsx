import React from 'react';
import Head from 'next/head';
import Icons from 'react-components/components/icon/Icons';

import NoteNotSelected from '../containers/NoteNotSelected';
import NotesListEmpty from '../containers/NotesListEmpty';
import NotesList from '../containers/NotesList';
import NotesEditor from '../containers/NotesEditor';
import NotesRendered from '../containers/NotesRendered';
import AppHeader from '../containers/AppHeader';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { createNewNote, NoteType, removeKey } from '../helpers/utils';
import { encrypt, decrypt } from '../helpers/encryption';

export const ADD_NOTE = 'ADD_NOTE';
export const SAVE_NOTE = 'SAVE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const CANCEL_NOTE = 'CANCEL_NOTE';

export const ENCRYPT_NOTE_REQUEST = 'ENCRYPT_NOTE_REQUEST';
export const ENCRYPT_NOTE_SUCCESS = 'ENCRYPT_NOTE_SUCCESS';
export const ENCRYPT_NOTE_ERROR = 'ENCRYPT_NOTE_ERROR';

export const DECRYPT_NOTE_REQUEST = 'DECRYPT_NOTE_REQUEST';
export const DECRYPT_NOTE_SUCCESS = 'DECRYPT_NOTE_SUCCESS';
export const DECRYPT_NOTE_ERROR = 'DECRYPT_NOTE_ERROR';

export const SELECT_NOTE = 'SELECT_NOTE';
export const INIT = 'INIT';

interface addNote {
    type: typeof ADD_NOTE;
    payload: NoteType;
}

interface saveNote {
    type: typeof SAVE_NOTE;
    payload: NoteType;
}

interface deleteNote {
    type: typeof DELETE_NOTE;
    payload: string;
}

interface editNote {
    type: typeof EDIT_NOTE;
    payload: boolean;
}

interface encryptNoteRequest {
    type: typeof ENCRYPT_NOTE_REQUEST;
    payload: string;
}

interface encryptNoteSuccess {
    type: typeof ENCRYPT_NOTE_SUCCESS;
    payload: { id: string; notes: NotesType };
}

interface decryptNoteRequest {
    type: typeof DECRYPT_NOTE_REQUEST;
    payload: string;
}

interface decryptNoteSuccess {
    type: typeof DECRYPT_NOTE_SUCCESS;
    payload: { id: string; decryptedContent: string };
}

interface selectNote {
    type: typeof SELECT_NOTE;
    payload: string;
}
interface cancelNote {
    type: typeof CANCEL_NOTE;
}

type NotesActionType =
    | addNote
    | deleteNote
    | selectNote
    | saveNote
    | editNote
    | cancelNote
    | encryptNoteRequest
    | encryptNoteSuccess
    | decryptNoteRequest
    | decryptNoteSuccess;

export interface NotesType {
    [key: string]: NoteType;
}

interface NotesState {
    notes: NotesType;
    decryptedNotes: any;
    encryptionQueue: string[];
    decryptionQueue: string[];
    selectedNoteId: string;
    modus: typeof INIT | typeof EDIT_NOTE | typeof SELECT_NOTE;
}

const notesReducer = (state: NotesState, action: NotesActionType) => {
    switch (action.type) {
        case ADD_NOTE:
            return {
                ...state,
                selectedNoteId: action.payload.id,
                notes: { ...state.notes, [action.payload.id]: action.payload },
                modus: EDIT_NOTE,
            };
        case CANCEL_NOTE:
            return {
                ...state,
                modus: SELECT_NOTE,
            };
        case SAVE_NOTE:
            return {
                ...state,
                selectedNoteId: action.payload.id,
                notes: { ...state.notes, [action.payload.id]: action.payload },
                modus: INIT,
            };
        case DELETE_NOTE:
            return {
                ...state,
                notes: removeKey(state.notes, action.payload),
                selectedNoteId: null,
                modus: INIT,
            };
        case EDIT_NOTE:
            return {
                ...state,
                modus: EDIT_NOTE,
            };
        case SELECT_NOTE:
            return {
                ...state,
                selectedNoteId: action.payload,
                modus: SELECT_NOTE,
            };
        case DECRYPT_NOTE_REQUEST:
            return {
                ...state,
                decryptionQueue: [...state.decryptionQueue, action.payload],
            };
        case DECRYPT_NOTE_SUCCESS:
            return {
                ...state,
                decryptedNotes: {
                    ...state.decryptedNotes,
                    [action.payload.id]: action.payload.decryptedContent,
                },
                decryptionQueue: [...state.decryptionQueue.filter((id) => id !== action.payload.id)],
            };
        case ENCRYPT_NOTE_REQUEST:
            return {
                ...state,
                encryptionQueue: [...state.encryptionQueue, action.payload],
            };
        case ENCRYPT_NOTE_SUCCESS:
            return {
                ...state,
                encryptionQueue: [...state.encryptionQueue.filter((id) => id !== action.payload.id)],
                notes: { ...state.notes, ...action.payload.notes },
                decryptedNotes: {
                    ...state.decryptedNotes,
                    [action.payload.id]: action.payload.notes[action.payload.id].content,
                },
                selectedNoteId: action.payload.id,
                modus: SELECT_NOTE,
            };
        default:
            return state;
    }
};
export const Home = () => {
    const [savedNotes, setSavedNotes] = useLocalStorage('notes', {});

    const initialState = {
        modus: 'INIT',
        notes: savedNotes,
        decryptedNotes: {},
        decryptionQueue: [],
        encryptionQueue: [],
        selectedNoteId: null,
    };

    const [
        { notes, decryptedNotes, decryptionQueue, encryptionQueue, selectedNoteId, modus },
        dispatch,
    ] = React.useReducer(notesReducer, initialState);

    React.useEffect(() => {
        setSavedNotes(notes);
    }, [notes]);

    const handleEdit = () => {
        dispatch({ type: EDIT_NOTE, payload: true });
    };

    const handleCancel = () => {
        dispatch({ type: CANCEL_NOTE });
    };

    /**
     * saves unencrypted notes content as an encrypted text.
     * @param unEncryptedNote
     */
    const handleNoteSave = async (unEncryptedNote: NoteType) => {
        const { id, content } = unEncryptedNote;

        dispatch({ type: ENCRYPT_NOTE_REQUEST, payload: id });

        const encryptedNoteContent = await encrypt(content);

        const encryptedNote = {
            ...unEncryptedNote,
            content: encryptedNoteContent,
        };

        const nextNotes = {
            ...notes,
            [id]: encryptedNote,
        };
        dispatch({ type: ENCRYPT_NOTE_SUCCESS, payload: { notes: nextNotes, id } });
    };

    const handleDelete = (id) => {
        dispatch({ type: DELETE_NOTE, payload: id });
    };

    const handleNewNote = () => {
        const newNote = createNewNote();
        dispatch({ type: ADD_NOTE, payload: newNote });
    };

    const handleSelectNote = async (id) => {
        if (id === selectedNoteId) {
            return;
        }

        dispatch({ type: SELECT_NOTE, payload: id });

        if (!(id in decryptedNotes) && !decryptionQueue[id]) {
            dispatch({ type: DECRYPT_NOTE_REQUEST, payload: id });

            const decryptedContent = await decrypt(notes[id].content);

            dispatch({ type: DECRYPT_NOTE_SUCCESS, payload: { decryptedContent, id } });
        }
    };

    const renderEditorModus = (modus) => {
        switch (modus) {
            case INIT:
                return <NoteNotSelected></NoteNotSelected>;
            case SELECT_NOTE:
                return (
                    <NotesRendered
                        key={selectedNoteId}
                        note={notes[selectedNoteId]}
                        decryptedContent={decryptedNotes[selectedNoteId]}
                        isDecrypting={decryptionQueue.includes(selectedNoteId)}
                        onEdit={handleEdit}
                    />
                );
            case EDIT_NOTE:
                return (
                    <NotesEditor
                        key={selectedNoteId}
                        note={notes[selectedNoteId]}
                        decryptedContent={decryptedNotes[selectedNoteId]}
                        isEncrypting={encryptionQueue.includes(selectedNoteId)}
                        onSave={handleNoteSave}
                        onCancel={handleCancel}
                        onDelete={() => handleDelete(selectedNoteId)}
                    />
                );
        }
    };

    return (
        <div>
            <Icons></Icons>
            <Head>
                <title>Proton Notes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <header className="container__header">
                    <AppHeader isEditing={modus === EDIT_NOTE} onCreateNewNote={handleNewNote} />
                </header>
                <div className="container__notesList">
                    {Object.values(notes).length > 0 ? (
                        <NotesList
                            notes={notes}
                            isEditing={modus === EDIT_NOTE}
                            selectedNoteId={selectedNoteId}
                            onSelectNote={handleSelectNote}
                        />
                    ) : (
                        <NotesListEmpty></NotesListEmpty>
                    )}
                </div>
                <div className="container__note">{renderEditorModus(modus)}</div>
            </div>
        </div>
    );
};

export default Home;

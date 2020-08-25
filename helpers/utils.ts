import { v4 as uuidv4 } from 'uuid';

export type NoteType = {
    title: string;
    content: string;
    id: string;
};

/**
 * creates a new note with a unique id
 */
export const createNewNote = (): NoteType => {
    const id = uuidv4();

    return {
        title: '',
        content: '',
        id,
    };
};

/**
 * Removes key from object
 * @param object {}
 * @param key the key to be deleted
 */
export const removeKey = (object, key: string) => {
    const { [key]: omit, ...rest } = object;

    return rest;
};

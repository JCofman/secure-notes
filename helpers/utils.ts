import { v4 as uuidv4 } from 'uuid';

export interface NoteType {
    title: string;
    content: string;
    id: string;
}

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: omit, ...rest } = object;

    return rest;
};

import { createNewNote, removeKey } from './utils';

test(`createNewNote should create a new not`, () => {
    const template = { title: '', content: '' };
    const newNote = createNewNote();
    expect(newNote).toMatchObject(template);
});

test(`removeKey should remove a key from an Object`, () => {
    const template = { title: '', content: '' };
    const modifiedTemplate = removeKey(template, 'title');
    const expectedTemplate = { content: '' };
    expect(modifiedTemplate).toEqual(expectedTemplate);
});

import { encrypt, decrypt } from './encryption';

test(`encrypt should return encrypted data`, async () => {
    const note = {
        id: '1',
        title: 'My note',
        content: 'That works',
    };
    const data = await encrypt(note);
    expect(data).toBe(note);
});

test(`decrypt should return decrypted data`, async () => {
    const note = {
        id: '1',
        title: 'My note',
        content: 'That works',
    };
    const data = await decrypt(note);
    expect(data).toBe(note);
});

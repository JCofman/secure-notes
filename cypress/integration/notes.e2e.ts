// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

describe('Secure Notes', () => {
    before(() => {
        cy.clearLocalStorage();
    });
    it('should show initial screen', () => {
        cy.visit('/');
        cy.findAllByText(/new note/i).should('exist');
    });

    it('should be able to create and save a new notes', () => {
        cy.newNote({ title: 'Hello, World', content: 'Thats the first note' });
    });

    it('should be able to delete a note', () => {
        const { title, content } = { title: 'To be removed', content: 'To be removed' };
        cy.newNote({ title, content });
        cy.findAllByText(title).first().click;
        cy.findByRole('button', { name: /edit/i }).click();
        cy.findByRole('button', { name: /delete/i }).click();
    });

    it('should be able to edit a note', () => {
        const { title, content } = { title: 'First title', content: 'First content' };
        const newTitle = 'Second Title';
        const newContent = 'Second content';

        cy.newNote({ title, content });
        cy.findAllByText(title).first().click;
        cy.findByRole('button', { name: /edit/i }).click();
        cy.findAllByRole('textbox').first().clear().type(newTitle);
        cy.dataCy('note-content').clear().type(newContent);
        cy.findByRole('button', { name: /save/i }).click();
        cy.findAllByText(newTitle);
        cy.findAllByText(newContent);
    });

    it('should be able to cancel editing', () => {
        const { title, content } = { title: 'First title', content: 'First content' };

        cy.newNote({ title, content });
        cy.findAllByText(title).first().click;
        cy.findByRole('button', { name: /edit/i }).click();
        cy.findByRole('button', { name: /cancel/i }).click();
    });
});

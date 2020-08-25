import React from 'react';

import { WarningButton, ErrorButton, PrimaryButton } from 'react-components/components/button';

import { useTargetValue } from '../../hooks/useTargetValue';
import Note from '../Note';
import { NoteType } from '../../helpers/utils';

import styles from './NotesEditor.module.scss';

interface NoteRenderedProps {
    note: NoteType;
    decryptedContent: string;
    isEncrypting: boolean;
    onSave: ({ id, title, content }: { id: string; title: string; content: string }) => void;
    onDelete: () => void;
    onCancel: () => void;
}

const NoteRendered = ({ note, decryptedContent, isEncrypting, onSave, onDelete, onCancel }: NoteRenderedProps) => {
    const [title, handleTitleChange] = useTargetValue(note.title);
    const [content, handleContentChange] = useTargetValue(decryptedContent);

    return (
        <Note
            titleArea={<input className={styles.note__input} autoFocus value={title} onChange={handleTitleChange} />}
            contentArea={<textarea className={styles.note__textarea} value={content} onChange={handleContentChange} />}
            controlsArea={
                <div className="flex flex-spacebetween">
                    <WarningButton className="flex-self-start" icon="close" disabled={isEncrypting} onClick={onCancel}>
                        {' '}
                        Cancel
                    </WarningButton>
                    <div>
                        <PrimaryButton
                            className="mr1"
                            icon="save"
                            disabled={isEncrypting}
                            onClick={() =>
                                onSave({
                                    id: note.id,
                                    title,
                                    content,
                                })
                            }
                        >
                            {' '}
                            Save
                        </PrimaryButton>

                        <ErrorButton icon="delete" disabled={isEncrypting} onClick={onDelete}>
                            {' '}
                            Delete
                        </ErrorButton>
                    </div>
                </div>
            }
        />
    );
};

export default NoteRendered;

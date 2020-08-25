import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from 'react-components/components/button';
import EllipsisLoader from 'react-components/components/loader/EllipsisLoader';
import Note from '../Note';

type NotesRenderedProps = {
    note: { title: string; content: string; id: string };
    decryptedContent: string;
    isDecrypting: boolean;
    onEdit: (toggle: boolean) => void;
};

const NotesRendered = (props: NotesRenderedProps) => {
    const {
        note: { title },
        decryptedContent,
        isDecrypting,
        onEdit,
    } = props;

    const contentArea = isDecrypting ? <EllipsisLoader></EllipsisLoader> : <ReactMarkdown source={decryptedContent} />;

    const controlsArea = (
        <Button disabled={isDecrypting} onClick={() => onEdit(true)} icon="file-edit">
            {' '}
            Edit
        </Button>
    );

    return <Note titleArea={title} contentArea={contentArea} controlsArea={controlsArea} />;
};

export default NotesRendered;

import React from 'react';

interface NoteProps {
    titleArea: React.ReactNode;
    contentArea: React.ReactNode;
    controlsArea: React.ReactNode;
}

const Note = (props: NoteProps) => {
    const { titleArea, contentArea, controlsArea } = props;
    return (
        <div className="note__container">
            <header className="border-bottom mw100 message-conversation-summary p0-5 pb1 flex-item-noshrink">
                <div className="flex flex-nowrap mb1">
                    <h2 className="mb0 h3 ellipsis lh-standard flex-item-fluid pr1">{titleArea}</h2>
                </div>
            </header>
            <div className="message-content note__container__textarea">{contentArea}</div>
            <div>{controlsArea}</div>
        </div>
    );
};

export default Note;

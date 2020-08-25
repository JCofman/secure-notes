import React from 'react';
import styles from './NotesListItem.module.scss';
import classNames from 'classnames';

interface NotesItemProps {
    title: string;
    key: string;
    selected: boolean;
    disabled: boolean;
    onClick: () => void;
}

const NotesItem = (props: NotesItemProps) => {
    const { title, key, selected, onClick } = props;
    const btnClass = classNames([styles.notesListItem__button, { [styles.notesListItem__button__selected]: selected }]);

    return (
        <li>
            <button className={btnClass} key={key}>
                <div
                    style={{ background: 'transparent' }}
                    onClick={onClick}
                    className="transparent item-container border-bottom item-container-row flex flex-items-center read cursor-pointer"
                >
                    <div className="flex-item-fluid flex flex-nowrap flex-column flex-spacebetween item-titlesender">
                        <div className="flex flex-items-center item-firstline">
                            <div className="flex-item-fluid flex w0 pr1">
                                <span className="inbl mw100 ellipsis bold">{title}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        </li>
    );
};

export default NotesItem;

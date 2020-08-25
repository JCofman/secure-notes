import React from 'react';
import Head from 'next/head';

import Icons from 'react-components/components/icon/Icons';

import AppHeader from '../containers/AppHeader/AppHeader';

export const Home = () => {
    return (
        <div>
            <Icons></Icons>
            <Head>
                <title>Proton Notes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <header className="container__header">
                    <AppHeader isEditing={false} onCreateNewNote={() => {}} />
                </header>
                <main>notes</main>
            </div>
        </div>
    );
};

export default Home;

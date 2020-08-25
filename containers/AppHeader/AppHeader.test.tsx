import React from 'react';
import { render } from '@testing-library/react';

import AppHeader from './AppHeader';

test(`AppHeader is rendered properly`, () => {
    const { container } = render(
        <AppHeader
            isEditing={false}
            onCreateNewNote={() => {
                // do nothing.
            }}
        />
    );
    expect(container).toMatchSnapshot();
});

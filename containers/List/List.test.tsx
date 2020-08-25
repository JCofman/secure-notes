import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

test(`List is rendered properly`, () => {
    const { container } = render(<List />);
    expect(container).toMatchSnapshot();
});

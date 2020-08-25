import React from 'react';

export const useTargetValue = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return [value, handleChange, setValue];
};

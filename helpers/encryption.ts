const wait = async (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

export const encrypt = async (data) => {
    await wait(500);

    return data;
};

export const decrypt = async (data) => {
    await wait(500);

    return data;
};

const wait = async (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

export const encrypt = async <T>(data: T): Promise<T> => {
    await wait(500);

    return data;
};

export const decrypt = async <T>(data: T): Promise<T> => {
    await wait(500);

    return data;
};

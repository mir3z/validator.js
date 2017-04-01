export const overEvery = (...fns) => (...args) => {
    for (let fn of fns) {
        if (!fn(...args)) {
            return false;
        }
    }

    return true;
};

export const overSome = (...fns) => (...args) => {
    for (let fn of fns) {
        if (fn(...args)) {
            return true;
        }
    }

    return false;
};
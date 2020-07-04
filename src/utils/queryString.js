export const queryString = (params) => {
    const queryObject = Object.keys(params);
    // console.log(queryObject);
    return queryObject.reduce(
        (acc, key, index, arr) =>
            acc +
            (params[key] || params[key] === 0
                ? `${key}=${params[key]}${index < queryObject.length - 1 ? '&' : ''}`
                : ''),
        '',
    );
};

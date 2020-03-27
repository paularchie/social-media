export const convertArrayToObject = (arr) => {
    return arr.reduce((acc, item) => {
        return {
            ...acc,
            ...item
        }
    }, {});
}
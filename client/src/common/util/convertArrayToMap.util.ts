export const convertArrayToMap = (arr: any[], key: string): { [key: string]: {} } => {
    return arr
        .map(item => {
            if (item instanceof Array) {
                return convertArrayToMap(item, key)
            }
            return {
                [item[key]]: item
            }
        })
        .reduce((acc, item) => ({ ...acc, ...item }));
};
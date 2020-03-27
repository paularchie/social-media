export const isEmptyObject = (obj: {}): boolean => {
    return obj ? Object.entries(obj).length === 0 && obj.constructor === Object : false;
}
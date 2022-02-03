export const checkBody = (check, body) => {
    for (let key in check) {
        if (!(key in body)) return false;
        if (check[key] != typeof body[key]) return false;
        if (check[key] == 'string') {
            if (body[key] == '') return false;
        }
    }
    return true;
}
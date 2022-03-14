export const checkProfil = (user) => {
    if (user.gender === '' || user.gender === null) return false;
    if (user.bio === ''    || user.bio === null) return false;
    if (user.tags === ''   || user.bio === null) return false;
    if (user.images === null || user.images.length === 0) return false;
    if (user.validmail === false) return false;
    return true;
}
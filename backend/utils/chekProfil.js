import { genSalt } from 'bcrypt';
import userModels from '../models/user';

export const checkProfil = (user) => {
    if (user.gender === '' || user.gender === null) return false;
    if (user.bio === ''    || user.bio === null) return false;
    if (user.tags === ''   || user.bio === null) return false;
    if (user.images === null || user.images.length === 0) return false;
    if (user.validmail === false) return false;
    return true;
}

export const checkProfilUid = async (uid) => {
    const user = await userModels.selectMe(uid);

    if (user === false) {
        return false;
    } else if (user === null) {
        return null;
    } else {
        const isOK = checkProfil(user);
        if (user.isOK !== isOK) {
            const sqlOK = await userModels.setVal(uid, 'isOK', isOK);
            if (sqlOK === false) {
                return false;
            } else {
                return true;
            }
        }
    }
}
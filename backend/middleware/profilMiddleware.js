import { checkProfil } from "../utils/chekProfil";

// A decomente
export const profilMiddleware = async (req, res, next) => {
    // if (req.me.validmail === false) {
    //     res.status(403).json({'error': 1, 'message': 'You need to validate your mail'});
    // } else if (checkProfil(req.me) === false) {
    //     res.status(403).json({'error': 1, 'message': 'You need to complete your profil'});
    // } else {
    // }
    next();
}
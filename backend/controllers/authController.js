const login = async (req, res) => {
    console.log(req.body);
    res.status(200).json({'desbarres': 'lol'});
};

const register = async (req, res) => {
    console.log(req.body);
    res.status(200).json({'desbarres': 'lol'});
};

export default {
    login,
    register,
}
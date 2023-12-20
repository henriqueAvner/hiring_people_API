module.exports = (req, res, next) => {
    const { email } = req.body;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;
    if (!email) {
        return res.status(400).send({ message: 'O campo e-mail é obrigatório' });
    }
    if (!regexEmail.test(email)) {
        return res.status(400).send({ mesage: 'O campo e-mail deve ser preenchido corretamente!' });
    }
    next();
};
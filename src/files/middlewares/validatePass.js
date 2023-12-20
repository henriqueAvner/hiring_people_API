module.exports = (req, res, next) => {
    const { pass } = req.body;
    if (!pass) {
        return res.status(400).send({ message: 'O campo password é obrigatório' });
    }
    if (pass.length < 6) {
        return res.status(400)
        .send({ message: 'O campo password deve conter pelo menos 6 caracteres' });
    }
    next();
};
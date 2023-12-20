module.exports = (req, res, next) => {
    const { cargo } = req.body;

    if (!cargo) {
        return res.status(400).json({ message: 'Digite um cargo para o funcionário!' });
    }
    if (cargo.length < 4 || typeof cargo !== 'string') {
        return res.status(400).json({ message: 'Digite um cargo válido para o funcionário!' });
    }
    next();
};
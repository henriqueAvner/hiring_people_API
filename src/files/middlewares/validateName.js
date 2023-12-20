module.exports = (req, res, next) => {
    const { name } = req.body;
    const regex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;

    if (!name) {
        return res.status(400).json({ message: 'Digite um nome para o funcionário!' });
    }
    if (name.length < 3 || regex.test(name)) {
        return res.status(400).json({ message: 'Digite um nome válido' });
    }
    next();
};
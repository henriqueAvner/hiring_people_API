module.exports = (req, res, next) => {
    const { departamento } = req.body;

    if (!departamento) {
        return res.status(400).json({ message: 'Digite um departamento para o funcionário!' });
    }
    if (typeof departamento !== 'string' || departamento.length < 2) {
        return res.status(400).json({ message: 'Digite um departamento válido!' });
    }
    next();
};
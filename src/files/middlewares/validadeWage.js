module.exports = (req, res, next) => {
    const { salario } = req.body;
    if (!salario) {
        return res.status(400).json({ message: 'Digite o salário do funcionário!' });
    }
    if (typeof salario !== 'number' || salario <= 2000) {
        return res.status(400).json({ message: 'Digite um salário válido' });
    }
    next();
 };
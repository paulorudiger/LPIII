const alunoService = require('../services/aluno');

const getAluno = async (req, res, next) => {
    try {
        await alunoService.getAluno()
            .then(ret => res.status(201).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const postAlunos = async (req, res, next) => {
    try {
        const retorno = await alunoService.postAlunos(req.body);
            res.status(201).send(retorno);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

module.exports.getAluno = getAluno
module.exports.postAlunos = postAlunos
const alunoController = require ('../controllers/aluno');

module.exports = (app) => {
    app.get('/aluno', alunoController.getAluno)
    app.post('/aluno', alunoController.postAlunos)
}
const Alunos = require("./aluno");
const Usuarios = require("./usuarios");

module.exports = (app) => {
    Alunos(app)
    Usuarios(app)
}
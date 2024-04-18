const Alunos = require("./aluno");
const Usuarios = require("./usuarios");
const Login = require("./login");

module.exports = (app) => {
    Alunos(app)
    Login(app)
    Usuarios(app)
}
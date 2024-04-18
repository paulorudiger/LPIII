const db = require('../configs/pg')
const cript = require('../utils/salt')

const sql_insert =
` insert into users (username, salt, password)
                values ($1, $2, $3)`

const newUser = async(params) => {
    console.log(params)
    const {user, pass} = params
   
    const {salt, hashedPassword} = cript.criarUsuario(pass)
    result = await db.query(sql_insert, [user, salt, hashedPassword])
    return result
}

const sql_get = `select id, username from users`

const getUser = async () => {
    result = await db.query(sql_get, [])
    return {
        total: result.rows.length,
        usuarios: result.rows
    }
}

const sql_delete = `delete from users where id = $1`

const deleteUser = async (params) => {
    return await db.query(sql_delete, [params.id])
}

const getUserId = async (id) =>{
    const query = 'SELECT username, salt, password FROM users WHERE id = $1';
    result = await db.query(query, [id])
    return result.rows[0];
}

const sql_patch =
        `update users
            set `

const patchPassword = async (params) => {
    const {id, name, pass, newpass} = params
    let binds = [id];
    const userData = await getUserId(id)
    let validorPassword = cript.comparePassword(userData.password,userData.salt, pass)
    if (validorPassword) {
        let sql = sql_patch
        if (newpass) {
            const {salt, hashedPassword} = cript.criarUsuario(newpass)
            sql += ' password = $2, salt = $3 '
            binds.push(hashedPassword)
            binds.push(salt)
        } 
        if (name) {
            sql += ' , username = $4 '
            binds.push(name)
        } 
        return await db.query(sql + ' where id = $1 ', binds)
    } else {
       return "Senha inválida.";
    }
}

module.exports.patchPassword = patchPassword
module.exports.newUser = newUser
module.exports.getUser = getUser
module.exports.deleteUser = deleteUser
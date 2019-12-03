const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Respostas_IFSP'
})

module.exports = conexao
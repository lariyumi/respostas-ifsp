const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path');
const bodyParser = require('body-parser')
const conexao = require('./conexao')

const server = express()
server.use(bodyParser())
server.engine('handlebars', handlebars({ defaultLayout: 'main' }))
server.set('view engine', 'handlebars')
server.use(express.static(path.join(__dirname, 'public')))

server.get('/', function(req, res) {
    const sql = "SELECT Usuario_Prontuario, Duvida from Duvida"

    conexao.query(sql, function(error, results, fields) {
        if (error)
            throw error;

        res.render('index', { duvidas: results })
    })
})

server.get('/index', function(req, res) {

    const sql = "SELECT Usuario_Prontuario, Duvida from Duvida"

    conexao.query(sql, function(error, results, fields) {
        if (error)
            throw error;

        res.render('index', { duvidas: results })
    })

})

server.get('/cadastro', function(req, res) {
    res.render('cadastro')
})

server.post('/cadastro', function(req, res) {
    const sql = "INSERT INTO Usuario VALUES(?, ?, ?, ?, ?);"
    const dados = [req.body.prontuario, req.body.nome, req.body.email, req.body.senha, req.body.tipo]

    conexao.query(sql, dados, function(error, results, fields) {
        if (error)
            throw error

        res.redirect('/index')
    })
})

server.get('/login', function(req, res) {
    res.render('login')
})

server.post('/login', (req, res) => {
    const sql = "SELECT * FROM Usuario WHERE prontuario = ? AND senha = ?;"
    const dados = [req.body.prontuario, req.body.senha]
    conexao.query(sql, dados, function(error, results, fields) {
        if (error) {
            throw error
        }
        for (i = 0; i < fields.length; i++) {
            if (fields[i].values == dados)
                return res.redirect('/index')

            return res.redirect('/login')
        }
    })
});

/*server.post('/login', function(req, res) {
    const sql = "SELECT * FROM Usuario WHERE prontuario = ? AND senha = ?;"
    const dados = [req.body.prontuario, req.body.senha]
    conexao.query(sql, dados, function(error, results, fields) {
        if (error)
            throw error

        if (req
    })

})*/

server.get('/menu_materias', function(req, res) {
    res.render('menu_materias')
})

server.get('/perfil', function(req, res) {
    res.render('perfil')
})

server.get('/materia/:nome', function(req, res) {
    res.render('materia')
})

server.get('/tema_prova', function(req, res) {
    res.render('tema_prova')
})

server.get('/postar_duvida', function(req, res) {
    res.render('postar_duvida')
})

server.listen(3000)
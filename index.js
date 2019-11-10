const express = require('express')

const handlebars = require('express-handlebars')

const path = require('path');
const hpath = require('path');

const server = express()
server.engine('handlebars', handlebars({ defaultLayout: 'main' }))
server.set('view engine', 'handlebars')
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.static(hpath.join(__dirname, 'views')))

server.get('/', function(req, res) {
    res.render('home')
})

server.get('/home', function(req, res) {
    res.render('home')
})

server.get('/cadastro', function(req, res) {
    res.render('cadastro')
})

server.get('/login', function(req, res) {
    res.render('login')
})

server.get('/menu_materias', function(req, res) {
    res.render('menu_materias')
})

/*server.get('/perfil/:nome', function(req, res) {
    res.render('perfil')
})

server.get('/materia/:nome', function(req, res) {
    res.render('materia')
})

server.get('/tema_prova/:materia', function(req, res) {
    res.render('tema_prova')
})

server.get('/postar_duvida/:tipo', function(req, res){
    res.render('postar_duvida')
})*/

server.listen(3000)
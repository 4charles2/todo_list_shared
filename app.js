let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

let ent = require('ent');
let HandleTodolist = require('./HandleTodolist');

var todoList = new HandleTodolist();

app.use(express.static('public'));

app.get('/', function(req,res){
    res.sendFile(__dirname+'/index.html')
});

io.on('connection', function(socket){
    //callbacks pour les tâches class Todolist
    //Les fonctions fléchées pour conservé le this local websocket en à besoin dans son code
    // let callbacks = {'error': (name, value) => {socket.emit(name, value)}, 'work': (name, value) => {io.emit(name, value)}};
    //Avec une syntaxe beaucoup plus claire
    let callbacks = {'error': socket.emit.bind(socket), 'work': io.emit.bind(io)};
    //Si un utilisateur veux supprimer une tâche
    socket.on('deleteTask', function (message) {
        todoList.delete(message,callbacks)
    });
    //Si l'utilisateur veut créer une nouvelle tâche
    socket.on('addTask', function (message) {
        let task = ent.encode(message);
        //Fait les test si le message est valide puis envoie un message d'erreur
        //à l'user si erreur
        //Sinon si les tests sont passé avec succes alors renvoie la todolist à tous les utilisateurs
        todoList.add(task,callbacks)
    });
    //Quand l'utilisateur se connecte on lui envoye la todolist
    socket.emit('connexion', todoList.show)
});

app.use((req,res)=>{
    res.redirect('/')
});
server.listen(8080);
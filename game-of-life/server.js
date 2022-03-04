var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});


function generator(matLen, gr, grEat, pr, fr) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3
        }
    }
    for (let i = 0; i < fr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5
        }
    }
    return matrix;
}
matrix = generator(20, 200, 10, 10, 3)


io.sockets.emit('send matrix', matrix)


grassArr = []
grassEaterArr = []
predatorArr=[]
corpseArr=[]
fireArr=[]


Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require('./Predator')
Corpse = require('./Corpse')
Fire  = require('./Fire')


function creator(matrix){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var gre = new GrassEater(x, y)
                grassEaterArr.push(gre)
            } else if (matrix[y][x] == 3) {
                var pre =new Predator(x, y)
                predatorArr.push(pre)
            } else if (matrix[y][x] == 4) {
                var cor =new Corpse(x, y)
                corpseArr.push(cor)
            } else if (matrix[y][x] == 5) {
                var fir =new Fire(x, y)
                fireArr.push(fir)
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}


function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for(var i in predatorArr){
        predatorArr[i].eat()
    }
    for(var i in corpseArr){
        corpseArr[i].humus()
    }
    for(var i in fireArr){
        fireArr[i].burn()
    }  
    io.sockets.emit("send matrix", matrix)
}

var stop_play_clickCount = 0
function stop_play(evt){
    stop_play_clickCount++
    console.log(evt)
    console.log(stop_play_clickCount)    
    return stop_play_clickCount
}

io.sockets.emit('stop_play', stop_play())

if(stop_play_clickCount%2==1){
    setInterval(game, 500)
}else{setInterval(game, 10000)
}

io.on('connection', function () {
creator(matrix)
})


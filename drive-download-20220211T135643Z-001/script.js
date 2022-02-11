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



let matrix = generator(20, 200, 10, 10,3)
var side = 20
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var corpseArr = []
var fireArr = []

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1)
    background('#acacac')
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
}


function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                //noStroke()
                fill("#6e5539")            
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 1) {
                stroke('black')
                fill("green")
                rect(x * side, y * side, side, side)
            }            
            else if (matrix[y][x] == 2) {
                stroke('black')
                fill("yellow")
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 3) {
                stroke('black')
                fill('brown')
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 4){
                stroke('black')
                fill('#bbc3c4')
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 5){
                stroke('black')
                fill('#ffcd17')
                rect(x * side, y * side, side, side)
            }
        }
    }
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
}

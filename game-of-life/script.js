var socket = io()

var side = 20


function setup() {
    createCanvas(20 * side + 1, 20 * side + 1)
    background('#acacac')
}


function nkarel() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#6e5539")            
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 1) {
                stroke('black')
                fill('green')
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
                var r1 = Math.floor(Math.random()*40)
                fill(215+r1,175+r1,0)
                rect(x * side, y * side, side, side)
            }
        }
    }
}


setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },1000
)

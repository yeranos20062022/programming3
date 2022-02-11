class Grass {
    constructor(x, y, index) {
        this.x = x
        this.y = y
        this.index = index
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 6) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}
//խոտ, բազմանում է

class GrassEater {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 1
        this.multiplay = 0
        this.directions = []
        this.age=0
    }
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        this.getNewCordinates()
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.multiply = 0;
        }
    }


    die() {
        
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1)
                break
            }
        }
        var r = Math.round(Math.random())
        if(r>=0.99){
            var cor = new Corpse(this.x,this.y,2)
            corpseArr.push(cor)       
            matrix[this.y][this.x] = 4
        }else if(r<0.99){
            matrix[this.y][this.x] = 0
        }
    }
    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2

            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

        } else {
            if(this.energy < 0 || this.age>=50) {
                this.die()
            }
        }
    }

    eat() {
        this.age++
        var grassCells = this.chooseCell(1);
        var newCell = random(grassCells)

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            this.energy += 2;

            matrix[this.y][this.x] = 0
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX
            this.y = newY

            if (this.energy >= 25) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }

}
//խոտակեր, ուտում է խոտը, մահանում է սովից կամ որոշ ժամանակ

class Predator {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 12
        this.multiplay = 0
        this.directions = []
    }
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        this.getNewCordinates()
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    chooseCell2(character1, character2) {
        this.getNewCordinates()
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newGrassEater = new Predator(newX, newY);
            predatorArr.push(newGrassEater);
            this.multiply = 0;
        }
    }


    die() {
        matrix[this.y][this.x] = 4
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1)
                break;
            }
        }
        var cor = new Corpse(this.x,this.y,5)
        corpseArr.push(cor)
    }
    move() {
        this.energy--
        var emptyCells = this.chooseCell2(0,1);
        var newCell = random(emptyCells);


        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3

            matrix[this.y][this.x] = 0
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX
            this.y = newY

        } else {
            if(this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {

        var grassCells = this.chooseCell(2);
        var newCell = random(grassCells)

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            this.energy += 2;

            matrix[this.y][this.x] = 0
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX
            this.y = newY

            if (this.energy >= 45) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }
}
//գիշատիչ, ուտում է խոտակերին, մահանում է սովից

class Corpse{
    constructor(x, y, m) {
        this.x = x
        this.y = y
        this.m = m
        this.multiply = 0
        this.time = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x,     this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1,     this.y],
            [this.x + 1,     this.y],
            [this.x - 1, this.y + 1],
            [this.x,     this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    humus(){
        this.multiply++
        this.time++
        var r = Math.floor(Math.random()*this.m)
        var emptyCells = this.chooseCell(0);        
        for(var i in emptyCells){
            if (emptyCells && this.multiply >= 18) {
                var newX = emptyCells[i][0]
                var newY = emptyCells[i][1]
                matrix[newY][newX] = 1

                var newGrass = new Grass(newX, newY, 1);
                grassArr.push(newGrass)
                this.multiply = 0                
            }

        }
        if(this.time >= 20){
            this.disappear()
        }
    }
    disappear(){
        matrix[this.y][this.x] = 0
        for (var i in corpseArr) {
            if (this.x == corpseArr[i].x && this.y == corpseArr[i].y) {
                corpseArr.splice(i, 1)
                break;
            }
        }
    }
}
//դի, առաջանում է խոտակերի կամ գիշատչի մահից հետո, իռ շուրջը ստեղծում է խոտ

class Fire {
    constructor(x, y, index) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.time = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCellnot(character) {
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] != character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    burn() {
        this.multiply++;
        var Cells = this.chooseCellnot(0)
        var newCell = random(Cells)

        if (newCell && this.multiply >= 9) {
            var newX = newCell[0]
            var newY = newCell[1]

            if(matrix[newY][newX]==1){
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            if(matrix[newY][newX]==2){
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            if(matrix[newY][newX]==3){
                for (var i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            if(matrix[newY][newX]==4){
                for (var i in corpseArr) {
                    if (newX == corpseArr[i].x && newY == corpseArr[i].y) {
                        corpseArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[newY][newX] = 5
            var fr = new Fire(newX, newY)
            fireArr.push(fr)
            this.multiply = 0
        }
        this.time++
        if(this.time>=20){
            matrix[this.y][this.x]=0                 
            this.extinguish()

        }    
    }
    extinguish() {
        for (var i in fireArr) {
            if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
                fireArr.splice(i, 1);
                break;
            }
        }
    }
}
//կրակ, այրում է ամեն ինչ
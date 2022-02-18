class Predator extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 12
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


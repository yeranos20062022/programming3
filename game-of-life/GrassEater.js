class GrassEater extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 1
        this.age=0
    }
    mul() {
        super.multiply++;
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)]


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
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)]

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

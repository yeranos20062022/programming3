let LivingCreature = require('./LivingCreature')

module.exports = class Fire extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.time=0
        }        
    chooseCellnot(c1,c2,c3,c4) {
        super.getNewCordinates()
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == c1 || 
                    matrix[y][x] == c2 || 
                    matrix[y][x] == c3 ||
                    matrix[y][x]         ){
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    burn() {
        this.multiply++
        this.time++
        var Cells = this.chooseCellnot(1,2,3,4)
        if (Cells && this.multiply >= 6) {
            for(var o in Cells){
                var newCell = Cells[o]
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
             else if(matrix[newY][newX]==2){
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[newY][newX]==3){
                for (var i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[newY][newX]==4){
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
            this.extinguish()
        }

 
    }
        if(this.time>=7){
            this.extinguish()
        }       
    }
    extinguish() {
        matrix[this.y][this.x]=0          
        for (var i in fireArr) {
            if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
                fireArr.splice(i, 1);
                break;
            }
        }
     }
}
//կրակ, այրում է ամեն ինչ
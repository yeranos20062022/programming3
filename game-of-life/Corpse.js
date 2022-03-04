let LivingCreature = require('./LivingCreature')

module.exports = class Corpse extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.time = 0
    }
    humus(){
        this.multiply++
        this.time++
        var emptyCells = super.chooseCell(0)       
        for(var i in emptyCells){
            if (emptyCells && this.multiply >= 18) {
                var newX = emptyCells[i][0]
                var newY = emptyCells[i][1]
                matrix[newY][newX] = 1

                var newGrass = new Grass(newX, newY, 1)
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


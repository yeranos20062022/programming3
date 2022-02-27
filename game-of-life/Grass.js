let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature{
     mul() {
        this.multiply++;
        if (this.multiply >= 6) {
            var emptyCells = super.chooseCell(0);
            var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)]
            if(this.multiply>=6 && newCell){
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 1;
                var newGrass = new Grass(newX, newY, 1);
                grassArr.push(newGrass);
                this.multiply = 0;
            }
        }
    }
}

//խոտ, բազմանում է

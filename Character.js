import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from './utils.js'

const font = ['fas fa-dice-one',
'fas fa-dice-two',
'fas fa-dice-three',
'fas fa-dice-four',
'fas fa-dice-five',
'fas fa-dice-six']

function Character(data) {
    Object.assign(this, data)
    this.maxHealth = this.health

    this.diceHtml = getDicePlaceholderHtml(this.diceCount)

    this.setDiceHtml = function() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map((num) =>
            `<i class="${font[num-1]} dice"></i>`).join("")
    }

    this.takeDamage = function (attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, num) => total + num)
        this.health -= totalAttackScore
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
        }
    }


    this.getHealthBarHtml = function () {
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class="health-bar-outer">
                    <div class='health-bar-inner ${percent < 26 ? "danger" : percent<50? "warning": ""}'   
                            style="width:${percent}%;">
                    </div>
                </div>`  
    }
    

    this.getCharacterHtml = function () {
        const { elementId, name, avatar, health, diceCount, diceHtml } = this
        const healthBar = this.getHealthBarHtml()
        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                    ${healthBar}
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div>`
    }
}

export default Character
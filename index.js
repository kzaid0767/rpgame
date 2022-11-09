import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false

const attackBtn = document.getElementById("attack-button")

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
    if(!isWaiting){
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
        const fas = document.querySelectorAll('.fas')
        for(let el of fas){
            el.classList.add('switch')
        }
        setTimeout(()=>{for(let el of fas){
            el.classList.remove('switch')
        }} ,900)
        if(wizard.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            else{
                endGame()
            }
        }    
    }
}

function endGame() {
    isWaiting = true
    attackBtn.hidden = true
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        wizard.health > 0 ? "The Wizard Wins" :
            `The ${monster.name} is Victorious`

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
        setTimeout(()=>{
            document.getElementById('main').innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `
        }, 1500)
    }
    
    attackBtn.addEventListener('click', attack)
    document.querySelector('#reset-button').addEventListener('click', restart)

function restart(){
    isWaiting = false
    attackBtn.hidden = false
    monstersArray = ["orc", "demon", "goblin"]
    document.getElementById('main').innerHTML = `<div id="hero">              
    </div>
    <div id="monster">
    </div>`
    monster = getNewMonster()
    wizard = new Character(characterData.hero)
    render()
}

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

let wizard = new Character(characterData.hero)

let monster = getNewMonster()
render()
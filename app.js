new Vue ({

    el: '#app',
    data: {
        playerHealth : 100,
        monsterHealth : 100,
        gameIsRunning : false,
        specialAtacksCounter : 0,
        healCounter : 0,
        turns : []
    },
    methods : {
        startGame () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.specialAtacksCounter = 0;
            this.healCounter = 0;
            this.turns = [];
        },

        attack() {
            let damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                status : 'player-turn',
                text : 'Player hits Monster for ' + damage
            })
            if(this.checkWin()){
                return;
            }

            this.mosnterAtack();
        },

        specialAtack() {            
            if(this.specialAtacksCounter >= 3){
                alert('No more special Atacks!')
                return;
            }else {
                this.specialAtacksCounter ++;
                let damage = this.calculateDamage(10,20);
                this.monsterHealth -= damage;
                this.turns.unshift({
                    status : 'playerSpecialAtack-turn',
                    text : 'Player hits Monster for ' + damage
                })
                if(this.checkWin()){
                    return;
                }    
                this.mosnterAtack();                
            }
        },

        heal() {
            if(this.healCounter >= 5) {
                alert('No more Heals!');
                return;
            }else {
                this.healCounter ++;
                if(this.playerHealth <= 90){
                    this.playerHealth += 10;
                    this.turns.unshift({
                        status : 'playerHeal-turn',
                        text : 'Player heals 10'
                    })
                    this.mosnterAtack();
                }else {
                    let life = 100 - this.playerHealth
                    this.playerHealth = 100;
                    this.turns.unshift({
                        status : 'playerHeal-turn',
                        text : 'Player heals ' + life
                    })
                    this.mosnterAtack();
                }
            }
        },

        giveUp(){
            this.gameIsRunning = false;
        },

        mosnterAtack() {
            let damage = this.calculateDamage(5,12);
            this.playerHealth -= damage
            this.turns.unshift({
                status : 'monster-turn',
                text : 'Monster hits Player for ' + damage
            })
            this.checkWin();
        },

        calculateDamage(min, max) {
            return  Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        checkWin() {
            if(this.monsterHealth <= 0) {
                if(confirm('You won! Do you want restart?')){
                    this.startGame();
                }else {
                    this.gameIsRunning = false;
                }
                return true;
            }else if (this.playerHealth <= 0) {
                if(confirm('You lost! Do you want restart?')){
                    this.startGame();
                }else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }

});
export const marking = {
    joker: 'Joker',
    blank: 'Blank',
    firebase: 'Firebase',
}

// Logics for the game

export class FirebaseGame{
    constructor(){
        this.gameKey = Math.floor(Math.random() * 3);
        this.balance = 15;
        this.currentBets = 0;
        this.betValues = [0, 0, 0];
    }

    decreaseBet(index){
        if(this.betValues[index] > 0){
            this.betValues[index]--;
            this.currentBets--;
            return this.betValues[index];
        }
        return 0;
    }

    increaseBet(index){
        if(this.balance > 0){
            this.betValues[index]++;
            this.currentBets++;
            return this.betValues[index];
        }
        return 0;
    }

    play(){
        this.balance -= this.currentBets;
        this.currentBets = 0;
        return this.balance;
    }
}
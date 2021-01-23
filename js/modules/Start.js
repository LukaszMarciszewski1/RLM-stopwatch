// import { Players } from "./Players";

import {ActivePlayer} from './ActivePlayer.js';
import {Time} from './Time.js';
import {Stopwatch} from './Stopwatch.js';
import {Active} from './Active.js';

export class Start{
    constructor(){
    this.timeInterval = 5000;
    this.timeSet = this.timeInterval / 1000
    this.active = 0
    this.playerList = [...document.querySelectorAll('.lamp')]
    let active = 0
    // this.active = new Active(this.playerList, this.timeInterval)
    this.activePlayer = new ActivePlayer(this.playerList, this.timeInterval);
    this.time = new Time('.time-now h3')
    this.stopwatch = new Stopwatch('.circular span', this.timeInterval, this.timeSet)
    this.active = new Active()

    this.clock()
    document.querySelector('.start').addEventListener('click', this.startRace.bind(this))
    }

    clock(){
        setInterval(this.time.getTime, 1000)
    }

    startRace(){
        let active = this.active.getActive()
        this.stopwatch.startTimer(this.timeSet)
        this.activePlayer.getPlayerPrepare(active)
        setInterval(()=>{
            active++
            this.activePlayer.getPlayerPrepare(active)
            this.activePlayer.getPlayerActive(active)
            this.stopwatch.stopTimer(active, this.playerList)
            
        },this.timeInterval)
    }

}
// import { Players } from "./Players";

import {Players} from './Players.js';
import {Time} from './Time.js';
import {Timer} from './Timer.js';

export class Start{
    constructor(){
    this.timeInterval = 10000
    this.players = new Players('.name');
    this.time = new Time('.time-now h3')
    this.timer = new Timer('.circular span', this.timeInterval)
    this.clock()
    document.querySelector('.start').addEventListener('click', this.startRace.bind(this))
    }

    clock(){
        setInterval(this.time.getTime, 1000)
    }
    startRace(){
        // setInterval
        // setTimeout()
        // console.log(this.players.playerList.length)
        this.players.startPlayers(this.timeInterval)
        this.timer.startTimer(this.timeInterval)
    }
}
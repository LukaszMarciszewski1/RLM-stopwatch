import {
    ActivePlayer
} from './ActivePlayer.js';
import {
    Time
} from './Time.js';
import {
    Stopwatch
} from './Stopwatch.js';
import {
    Active
} from './Active.js';
import {
    Settings
} from './Settings.js';
import {
    PanelSettings
} from './PanelSettings.js';

import {
    AddPlayer
} from './AddPlayer.js';

export class Start {
    constructor() {
        this.name = document.getElementById('name-player')
        this.number = document.getElementById('nr-player')
        this.playerList = [...document.querySelectorAll('.name')]
        this.containerList = document.querySelector('.list-container')

        this.addPlayer = new AddPlayer(this.name, this.number, this.playerList, this.containerList)
        this.active = new Active()
        this.settings = new Settings("interval-time")
        this.activePlayer = new ActivePlayer(this.playerList, this.playerName);
        this.time = new Time('.time-now h2')
        this.stopwatch = new Stopwatch('.circular span')
        this.panelSettings = new PanelSettings('.open-settings', '.close-settings', '.settings-container')
        this.btnStart = document.querySelector('.start')


        document.getElementById('interval-time').addEventListener('change', this.render.bind(this))
        document.querySelector('#form-player').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addPlayer.addPlayerToList()
        })
        this.containerList.addEventListener('click', (e) => {
            this.addPlayer.deletePlayer(e.target)
        })

        this.render()
        this.btnStart.addEventListener('click', this.startRace.bind(this))
    }
    //metods----------------->
    render() {
        this.stopwatch.timerSpan.textContent = this.settings.count()
        setInterval(this.time.getTime, 1000)
    }

    race() {
        let timeSet = this.settings.count()
        let timeInterval = this.settings.count() * 1000
        let active = this.active.getActive()

        this.stopwatch.timerSpan.textContent = timeSet
        this.stopwatch.startTimer(timeSet, timeInterval)
        this.activePlayer.getPlayerPrepare(active)
        setInterval(() => {
            active++
            this.activePlayer.getPlayerPrepare(active)
            this.activePlayer.getPlayerActive()
            this.stopwatch.stopTimer(active, this.playerList)

        }, timeInterval)
    }

    startRace() {
        if(this.playerList){
            if(this.playerList.length >= 2){
             this.race()
            }
            else return alert('W wyścigu musi brać udział więcej niż jedna osoba')
        }
     }

}
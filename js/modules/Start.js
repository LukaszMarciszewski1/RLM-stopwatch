
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

export class Start {
    constructor() {
        this.playerList = [...document.querySelectorAll('.lamp')]
        this.settings = new Settings("interval-time")
        this.activePlayer = new ActivePlayer(this.playerList);
        this.time = new Time('.time-now h3')
        this.stopwatch = new Stopwatch('.circular span')
        this.active = new Active()
        this.panelSettings = new PanelSettings('.open-settings', '.close-settings', '.settings-container')

        this.render()
        document.getElementById('interval-time').addEventListener('change', this.render.bind(this))
        document.querySelector('.start').addEventListener('click', this.startRace.bind(this))
    }
    //metods----------------->

    render() {
        this.stopwatch.timerSpan.textContent = this.settings.count()
        setInterval(this.time.getTime, 1000)
    }

    startRace() {
        let timeSet = this.settings.count()
        let timeInterval = this.settings.count() * 1000
        let active = this.active.getActive()

        this.stopwatch.timerSpan.textContent = timeSet
        this.stopwatch.startTimer(timeSet, timeInterval)
        this.activePlayer.getPlayerPrepare(active)
        setInterval(() => {
            active++
            this.activePlayer.getPlayerPrepare(active)
            this.activePlayer.getPlayerActive(active)
            this.stopwatch.stopTimer(active, this.playerList)

        }, timeInterval)
    }

}
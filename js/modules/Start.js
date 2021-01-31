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
    Players
} from './Players.js';
import {
    PlayerData
} from './PlayerData.js';

export class Start {
    constructor() {
        this.access = true
        this.btnStart = document.querySelector('.start')
        this.playersList = [...document.querySelectorAll('.name')]
        this.containerList = document.querySelector('.list-container')

        this.active = new Active()
        this.settings = new Settings("interval-time")
        this.activePlayer = new ActivePlayer(this.playersList);
        this.time = new Time('.time-now h2')
        this.stopwatch = new Stopwatch('.circular span')
        this.panelSettings = new PanelSettings('.open-settings', '.close-settings', '.settings-container')
        this.players = new Players(this.playersList, this.containerList)

        //upgrade players
        this.players.displayPlayer()

        //render time
        this.render()
        document.getElementById('interval-time').addEventListener('change', this.render.bind(this))

        // Add player
        document.querySelector('#form-player').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name-player').value
            const number = document.getElementById('nr-player').value

            if (name === "" || number === "") return alert('uzupełnij pole');
            if (number.length > 3) return alert('maxymalny numer zawodnika nie może być większy od 999')
            if (this.access) {
                const player = new PlayerData(name, number)
                this.players.addPlayerToList(player)
                this.players.storeAddPlayer(player)
            } else return alert('Wyścig został zakończony nie możesz dodawać graczy')
            console.log(this.playersList.length)
            console.log(localStorage)
            console.log(this.playersList)
        })

        // // Remove player
        this.containerList.addEventListener('click', (e) => {
            if (this.access) {
                this.players.deletePlayer(e.target)
                this.players.storeRremovePlayer(e.target)
            } else {
                e.target.classList.add('.active-race')
                alert('nie mozna')
            }
        })
        //clear localstorage
        document.querySelector('#form-player').addEventListener('reset', () => {
            if (confirm("Czy chcesz wyczyścić zapisane dane?")) {
                if (this.access && this.playersList.length > 0) {
                    localStorage.clear()
                    this.playersList.splice(0);
                    this.containerList.textContent = ''
                }
            }
            console.log(this.playersList.length)
            console.log(localStorage)
            console.log(this.playersList)
        })

        //Start race
        this.btnStart.addEventListener('click', this.startRace.bind(this))
    }

    //metods----------------->
    render() {
        setInterval(this.time.getTime, 1000)
        this.stopwatch.timerSpan.textContent = this.settings.count()
    }

    race() {
        this.access = false
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
            this.stopwatch.stopTimer(active, this.playersList)

        }, timeInterval)
    }

    startRace() {
        if (this.playersList.length >= 2) {
            this.race()
        } else return alert('W wyścigu musi brać udział więcej niż jedna osoba')
    }
}
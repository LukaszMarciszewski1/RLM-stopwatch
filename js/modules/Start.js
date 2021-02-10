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
import {
    Restart
} from './Restart.js';

export class Start {
    constructor() {
        this.access = true
        this.startRaceAccess = false
        this.btnStart = document.querySelector('.start')
        this.btnRestart = document.querySelector('.restart')
        this.playersList = [...document.querySelectorAll('.player-item')]
        this.containerList = document.querySelector('.list-container')
        this.settingTime = document.getElementById("start-time")
        this.clock = document.querySelector('.clock h2');
        this.countdownTime = document.querySelector('.countdown-time')
        this.containerStartTime = document.querySelector('.select-time')

        this.active = new Active()
        this.settings = new Settings("interval-time", this.countdownTime)
        this.activePlayer = new ActivePlayer(this.playersList);
        this.time = new Time(this.clock)
        this.stopwatch = new Stopwatch('.circular span')
        this.panelSettings = new PanelSettings('.open-settings', '.close-settings', '.settings-container')
        this.players = new Players(this.playersList, this.containerList)
        this.restart = new Restart(this.btnStart, this.btnRestart)

        this.restart.displayBtn(this.access)

        //upgrade players
        this.players.displayPlayer()

        //changing the starting time interval of players
        document.getElementById('interval-time').addEventListener('change', this.render.bind(this))


        // Add player to list
        document.querySelector('#to-do-player-list').addEventListener('submit', (e) => {
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
        })

        // remove player from list
        this.containerList.addEventListener('click', (e) => {
            if (this.access) {
                this.players.deletePlayer(e.target)
                this.players.storeRremovePlayer(e.target)
            } else {
                e.target.classList.add('.active-race')
                alert('nie mozna')
            }
        })

        //clear list player
        document.querySelector('#to-do-player-list').addEventListener('reset', () => {
            if (this.access && this.playersList.length > 0) {
                if (confirm("Czy chcesz wyczyścić zapisane dane?")) {
                    localStorage.clear()
                    this.playersList.splice(0);
                    this.containerList.textContent = ''
                }
            } else throw new Error("Nie możesz czyścić listy w trakcie wyścigu")
        })

        //render
        this.render()

        //Start race
        this.btnStart.addEventListener('click', this.startRace.bind(this))

        //Restart race
        this.btnRestart.addEventListener('click', () => {
            setTimeout(this.restart.changeBtn, 1000);
            location.reload()
        })

        // this.timeRender()
    }

    //metods----------------->

    render() {
        setInterval(() => {
            this.time.getTime()
            this.settings.countdownTime(this.settingTime)
        }, 1000);

        //circle timer interval
        this.stopwatch.timerSpan.textContent = this.settings.count()

        //start time text content
        document.getElementById('start-time').addEventListener('change', () => {
            this.containerStartTime.textContent = this.settingTime.value.slice(11)
        })
        this.containerStartTime.textContent = 'Ustaw godzinę startu'
    }

    race(interval) {
        let active = 0
        active++
        this.activePlayer.getPlayerPrepare(active)
        setInterval(() => {
            active++
            this.activePlayer.getPlayerPrepare(active)
            this.activePlayer.getPlayerActive()
            this.stopwatch.stopTimer(active, this.playersList)
        }, interval)
    }

    startRace() {
        this.access = false
        let active = 0
        let timeSet = this.settings.count()
        let timeInterval = this.settings.count() * 1000

        console.log(timeSet)
        if (this.settingTime.value === '') {
            return alert('Wybierz godzinę startu')
        }
        if (this.playersList.length >= 2) {
            this.activePlayer.getPlayerPrepare(active)
            this.restart.displayBtn(this.access)

            const intTime = setInterval(() => {
                this.time.getTime()
                this.settings.countdownTime(this.settingTime)
            }, 1000);

            const intBefore = setInterval(() => {
                if(this.settings.secondsToStart() === timeSet){
                    this.stopwatch.timerSpan.textContent = timeSet
                    this.stopwatch.startTimer(timeSet, timeInterval)
                 }
            }, 1000);

            const int = setInterval(() => {
                if (this.settings.canStart() === 0) {
                    clearInterval(int)
                    this.activePlayer.getPlayerActive()
                    this.race(timeInterval)
                }
            }, 1000);

        } else return alert('W wyścigu musi brać udział więcej niż jedna osoba')
    }

}
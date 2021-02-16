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
// import {
//     PanelSettings
// } from './PanelSettings.js';

import {
    Players
} from './Players.js';
import {
    PlayerData
} from './PlayerData.js';
import {
    Restart
} from './Restart.js';
import {
    LoadList
} from './loadList.js';

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
        this.spanCircle = document.querySelector('.span-start')
        this.settingsContainer = document.querySelector('.settings-container')
        this.infoPopup = document.querySelector('.info-popup')
        this.acceptPopup = document.querySelector('.accept')
        this.intervalTime = null
        this.btnOpenSettings = [...document.querySelectorAll('.open-settings-st')]
        this.btnCloseSettings = [...document.querySelectorAll('.close-settings')]
        this.btnFileLoad = document.querySelector('input[type="file"]')
        this.btnAddToList = document.querySelector('.add-to-list')
        this.btnResetList = document.querySelector('.reset-list')
        this.btnResetSettings = [...document.querySelectorAll('.reset-settings')]
        this.playersPanelMobile = document.querySelector('.players-container')
        this.end = 'GO!'


        this.active = new Active()
        this.settings = new Settings("interval-time", this.countdownTime)
        this.activePlayer = new ActivePlayer(this.playersList);
        this.time = new Time(this.clock)
        this.stopwatch = new Stopwatch(this.spanCircle)
        // this.panelSettings = new PanelSettings(this.settingsContainer, this.infoPopup)
        this.players = new Players(this.playersList, this.containerList, this.btnFileLoad)
        this.restart = new Restart(this.btnStart, this.btnRestart)
        // this.loadList = new LoadList(this.btnFileLoad, this.playersList, this.containerList)

        console.log(this.playersList)

        //display btn start
        this.restart.displayBtn(this.access)

        //upgrade players
        this.players.displayPlayer()
        // this.players.loadPlayerList.display()

        // load players list
        this.btnFileLoad.addEventListener('change', (e) => {
            this.players.loadPlayerList()
        })

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
            }
            if (!this.access) {
                console.log(this.access)
                return alert('W trakcie wyścigu nie można dodawać zawodników do listy')
            }
        })

        // remove player from list
        this.removePlayer()

        //clear list player
        document.querySelector('#file-upload-form').addEventListener('reset', () => {
            if (this.access && this.playersList.length > 0) {
                if (confirm("Czy chcesz wyczyścić zapisane dane?")) {
                    localStorage.clear()
                    this.playersList.splice(0);
                    this.containerList.textContent = ''
                }
            } 
            else throw new Error("Nie możesz czyścić listy w trakcie wyścigu")
        })

        //render setup
        this.render()

        //Start race
        this.btnStart.addEventListener('click', this.startRace.bind(this))

        //Restart race
        this.btnRestart.addEventListener('click', () => {
            setTimeout(this.restart.changeBtn, 1000);
            location.reload()
        })

        //panelSettings methods
        // this.btnOpenSettings.addEventListener('click', () => this.settingsContainer.classList.add('display-container'))
        this.btnOpenSettings.forEach(open => open.addEventListener('click', ()=> this.settingsContainer.classList.add('display-container')))
        
        this.btnCloseSettings.forEach(close => close.addEventListener('click', ()=> close.parentNode.classList.remove('display-container')))

        this.btnResetSettings.forEach(btn => btn.addEventListener('click', () =>location.reload()))
        //panelSettings mobile methods
        document.querySelector('.mobile-player-lis').addEventListener('click', () => this.playersPanelMobile.classList.add('display-container'))
    }

    //metods----------------->
    render() {
        //clock and countdown to start
        this.intervalTime = setInterval(() => {
            this.time.getTime()
            this.settings.countdownTime(this.settingTime)
            if (this.playersList.length < 2 && this.playersList.length !== ''){
                this.btnStart.setAttribute('disable', true)
                console.log('disable')
                // alert('Dodaj zawodników do listy')
            }
            else {
                this.btnStart.setAttribute('enable', true)
                console.log('enable')
            }
        }, 1000);

        //setup circle interval time
        this.stopwatch.timerSpan.textContent = this.settings.count()
        document.getElementById('interval-time').addEventListener('change', () => {
            this.stopwatch.timerSpan.textContent = this.settings.count()
        })

        //setup start time
        this.containerStartTime.textContent = 'Ustaw godzinę startu';
        this.containerStartTime.style.fontSize = '20px'
        document.getElementById('start-time').addEventListener('change', () => {
            this.containerStartTime.textContent = this.settingTime.value.slice(11) + ":00"
            this.containerStartTime.style.fontSize = '26px'
        })
    }
    removePlayer() {
        this.containerList.addEventListener('click', (e) => {
            console.log('okk')
            if (this.access) {
                this.players.deletePlayer(e.target)
                this.players.storeRremovePlayer(e.target)
            } else {
                e.target.classList.add('.active-race')
                this.infoPopup.classList.add('info-popup--active')
            }
        })
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

        if (this.settingTime.value === '') {
            return alert('Wybierz godzinę startu')
        }

        if (timeSet >= this.settings.secondsToStart() || isNaN(this.settings.secondsToStart())) {
            return alert('Odstep czasowy nie może być mniejszy niż pozostały czas do startu')
        }

        if (this.playersList.length >= 2 && !this.playersList.length == '') {
            this.activePlayer.getPlayerPrepare(active)
            this.restart.displayBtn(this.access)
            this.btnOpenSettings.forEach(btn => btn.classList.add('inactive'))
            this.btnAddToList.classList.add('inactive')
            this.btnResetList.classList.add('inactive')
            this.btnFileLoad.setAttribute("disabled", true)
            document.querySelectorAll('.inactive').forEach(btn => btn.setAttribute("disabled", true))

            const intTime = setInterval(() => {
                this.time.getTime()
                clearInterval(this.intervalTime)
                // if(this.stopwatch.timerSpan.textContent == 6){
                //     var audio = new Audio('../../assets/beep.mp3');
                //     audio.play();
                // }
                console.log(this.stopwatch.timerSpan.textContent)
            }, 1000);

            const intCountdown = setInterval(() => {
                this.settings.countdownTime(this.settingTime)
            }, 1000);

            const intBefore = setInterval(() => {
                if (this.settings.secondsToStart() === timeSet) {
                    this.stopwatch.timerSpan.textContent = timeSet
                    this.stopwatch.startTimer(timeSet, timeInterval)
                }
                if(this.stopwatch.timerSpan.textContent == 7){
                    var audio = new Audio('assets/beep.mp3');
                    audio.play();
                }
                if(this.stopwatch.timerSpan.textContent <= 6){
                    this.spanCircle.style.color = '#00d9f6'
                }
                else{
                    this.spanCircle.style.color = 'rgb(230, 230, 230)'
                }
                
                
                this.stopwatch.showStartTxt(this.settings.canStart())
                
            }, 1000);

            const int = setInterval(() => {
                if (this.settings.canStart() === 0) {
                    clearInterval(int)
                    this.activePlayer.getPlayerActive()
                    this.race(timeInterval)
                }
            }, 1000);

            const clear = setInterval(() => {
                if (this.spanCircle.textContent === this.end) {
                    clearInterval(intBefore)
                    clearInterval(intCountdown)
                    clearInterval(clear)
                }
            }, 1000);

        } 
        else return alert('W wyścigu musi brać udział więcej niż jedna osoba')
    }

}
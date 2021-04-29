import {ActivePlayer} from './ActivePlayer.js';
import {Time} from './Time.js';
import {Stopwatch} from './Stopwatch.js';
import {Settings} from './Settings.js';
import {Players} from './Players.js';
import PlayerData from './PlayerData.js';
import {Restart} from './Restart.js';

export class Race {
    constructor() {
        this.access = true;
        this.startRaceAccess = false;
        this.btnStart = document.querySelector('.start');
        this.btnRestart = document.querySelector('.restart');
        this.playersList = [...document.querySelectorAll('.player-item')];
        this.containerList = document.querySelector('.list-container');
        this.settingTime = document.getElementById("start-time");
        this.clock = document.querySelector('.clock h2');
        this.countdownTime = document.querySelector('.countdown-time');
        this.containerStartTime = document.querySelector('.select-time');
        this.spanCircle = document.querySelector('.span-start');
        this.settingsContainer = document.querySelector('.settings-modal');
        this.infoPopup = document.querySelector('.info-popup');
        this.acceptPopup = document.querySelector('.accept');
        this.intervalTime = null;
        this.btnOpenSettings = [...document.querySelectorAll('.open-settings-st')];
        this.btnCloseSettings = [...document.querySelectorAll('.close-settings')];
        this.btnFileLoad = document.querySelector('input[type="file"]');
        this.btnAddToList = document.querySelector('.add-to-list');
        this.btnResetList = document.querySelector('.reset-list');
        this.btnResetSettings = [...document.querySelectorAll('.reset-settings')];
        this.playersPanelMobile = document.querySelector('.control-container');
        this.blueColor = '#00d9f6';
        this.fontColor = 'rgb(230, 230, 230)';
        this.audio = new Audio('public/beep.mp3');
        this.end = 'GO!';

        this.settings = new Settings("interval-time", this.countdownTime);
        this.time = new Time(this.clock);
        this.stopwatch = new Stopwatch(this.spanCircle, this.end, this.blueColor);
        this.players = new Players(this.playersList, this.containerList, this.btnFileLoad);
        this.activePlayer = new ActivePlayer(this.playersList);
        this.restart = new Restart(this.btnStart, this.btnRestart);

        //render setup
        this.render();

        //display btn start
        this.restart.displayBtn(this.access);

        //upgrade players
        this.players.displayPlayer();

        // loading the file with the list of players
        this.btnFileLoad.addEventListener('change', () => this.players.loadPlayerList());

        // Add player to list
        document.querySelector('#to-do-player-list').addEventListener('submit', this.addPlayers.bind(this));

        //clear list player
        document.querySelector('#file-upload-form').addEventListener('reset', this.clearListPlayers.bind(this));

        // remove player from list
        this.removePlayer();

        //Start race
        this.btnStart.addEventListener('click', this.startRace.bind(this));

        //open settings container
        this.btnOpenSettings.forEach(open => open.addEventListener('click', () => this.settingsContainer.classList.add('display-container')));

        //close settings container
        this.btnCloseSettings.forEach(close => close.addEventListener('click', () => close.parentNode.classList.remove('display-container')));

        //Restart race
        this.btnRestart.addEventListener('click', (e) => {
            e.preventDefault()
            setTimeout(this.restart.changeBtn, 1000);
            location.reload()
        });

        //reset btn
        this.btnResetSettings.forEach(btn => btn.addEventListener('click', () => {
            alert("Czy chcesz zresetować ustawienia ?");
            location.reload()
        }));

        //panelSettings mobile
        document.querySelector('.mobile-player-lis').addEventListener('click', () => this.playersPanelMobile.classList.add('display-container'));

        //accept popup info
        this.acceptPopup.addEventListener('click', () => this.acceptPopup.parentNode.classList.remove('info-popup--active'))
    }

    //display of time, time interval and set start time
    render() {
        //clock and countdown to start
        this.intervalTime = setInterval(() => {
            this.time.getTime()
            this.settings.countdownTime(this.settingTime)
        }, 1000);

        //setup circle interval time
        this.stopwatch.timerSpan.textContent = this.settings.count()
        document.getElementById('interval-time').addEventListener('change', () => {
            this.stopwatch.timerSpan.textContent = this.settings.count()
        });

        //setup start time
        this.containerStartTime.textContent = 'Ustaw godzinę startu';
        document.getElementById('start-time').addEventListener('change', () => {
            this.containerStartTime.textContent = this.settingTime.value.slice(11) + ":00"
            this.containerStartTime.classList.add('item-status-timer--big')
        })
    }

    //adding players to the list and localstorage using this to do list
    addPlayers(e) {
        e.preventDefault();
        const name = document.getElementById('name-player').value;
        const number = document.getElementById('nr-player').value;
        const player = new PlayerData(name, number);

        if (name === "" || number === "") return alert('uzupełnij pole');
        if (number.length > 3) return alert('maxymalny numer zawodnika nie może być większy od 999');
        if (name.length > 30) return alert('Imię i nazwisko nie może być dłuższe niż 30 znaków');
        //if you can make changes
        if (this.access) {
            this.players.addPlayerToList(player, number)
            this.players.storeAddPlayer(player, number)
        };
        //if no changes can be made, the race is on
        if (!this.access) {
            return alert('W trakcie wyścigu nie można dodawać zawodników do listy')
        }
    }
    
    //pressing the clear button removes all players from the list
    clearListPlayers() {
        if (this.access && this.playersList.length > 0) {
            if (confirm("Czy chcesz wyczyścić zapisane dane?")) {
                this.players.clearList()
            }
        } else throw new Error("Nie możesz czyścić listy w trakcie wyścigu")
    }

    //pressing the delete button removes the player from the list
    removePlayer() {
        this.containerList.addEventListener('click', (e) => {
            if (this.access) {
                this.players.deletePlayer(e.target);
                this.players.storeRremovePlayer(e.target)
            } else {
                e.target.classList.add('.active-race');
                this.infoPopup.classList.add('info-popup--active')
            }
        })
    }

    //progress countdown for the active player
    activeRace(interval) {
        let active = 0
        active++
        //add preparation on the first player
        this.activePlayer.getPlayerPrepare(active);
        setInterval(() => {
            active++
            this.activePlayer.getPlayerPrepare(active);
            this.activePlayer.getPlayerActive();
            this.stopwatch.stopTimer(active, this.playersList)
        }, interval)
    }

    //starts the method when the start button is pressed
    startRace() {
        let active = 0;
        let timeSet = this.settings.count();
        let timeInterval = this.settings.count() * 1000;

        if (this.settingTime.value === '') {
            return alert('Wybierz godzinę startu')
        }

        if (timeSet >= this.settings.secondsToStart() || isNaN(this.settings.secondsToStart())) {
            return alert('Odstep czasowy nie może być mniejszy niż pozostały czas do startu')
        }

        if (this.playersList.length >= 2) {
            //parameters cannot be changed
            this.access = false;
            //after pressing start, add player preparation
            this.activePlayer.getPlayerPrepare(active);
            this.restart.displayBtn(this.access);
            //add blockade on buttons if the race is on
            this.btnOpenSettings.forEach(btn => btn.classList.add('inactive'));
            this.btnAddToList.classList.add('inactive');
            this.btnResetList.classList.add('inactive');
            this.btnFileLoad.setAttribute("disabled", true);
            document.querySelectorAll('.inactive').forEach(btn => btn.setAttribute("disabled", true));

            const intTime = setInterval(() => {
                //start the new time and stop the old one if the start button has been enabled
                this.time.getTime();
                clearInterval(this.intervalTime)
            }, 1000);

            const intCountdown = setInterval(() => {
                this.settings.countdownTime(this.settingTime)
            }, 1000);

            const intBefore = setInterval(() => {
                //the sound lasts 6 seconds + 1 seconds interval 
                if (this.stopwatch.timerSpan.textContent == 7) {
                    this.audio.play()
                };

                //if the set interval is equal to the time to start, the circle function will be executed
                if (this.settings.secondsToStart() === timeSet) {
                    this.stopwatch.timerSpan.textContent = timeSet
                    this.stopwatch.startTimer(timeSet, timeInterval)
                };

                //if timerSpan = 5 seconds add color blue
                if (this.stopwatch.timerSpan.textContent <= 6) {
                    this.spanCircle.style.color = this.blueColor
                } else {
                    this.spanCircle.style.color = this.fontColor
                };

                this.stopwatch.changePrepareName()
            }, 1000);

            const int = setInterval(() => {
                //if seconds in countdown timer = 0 start the race
                if (this.settings.canStart() === 0) {
                    //adding an active player on a previously started player
                    this.activePlayer.getPlayerActive();
                    //stopping interval to add an active player this.activeRace() method has its own interval
                    clearInterval(int);
                    this.activeRace(timeInterval);
                    clearInterval(intCountdown)
                }
            }, 1000);

            const clear = setInterval(() => {
                if (this.spanCircle.textContent === this.end) {
                    clearInterval(intBefore);
                    clearInterval(clear)
                }
            }, 1000);

        } else return alert('W wyścigu musi brać udział więcej niż jedna osoba');
    }
}
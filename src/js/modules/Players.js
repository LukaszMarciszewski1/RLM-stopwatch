import {
    PlayerDataLoadFile
} from './PlayerDataLoadFile.js';

export class Players {
    constructor(playersList, containerList, inputLoad) {
        this.playersList = playersList;
        this.containerList = containerList;
        this.inputLoad = inputLoad;
        this.players = this.storeGetPlayer()
    }

    //display items in list
    displayPlayer() {
        this.players.forEach((player) => this.addPlayerToList(player))
    }

    //add file Xlsx to list
    loadPlayerList() {
        let file = this.inputLoad.files[0];
        readXlsxFile(file).then((data) => {
                const containerList = this.containerList;
                const playersList = this.playersList;

                data.map((row, index) => {
                    if (file) {
                        const rows = document.createElement('div');
                        rows.className = 'player-item';
                        rows.innerHTML = `
                   <h5>${row[0]}</h5>
                   <p>${row[1]}</p>
                   <div class="lamp"></div>
                   <ion-icon name="close-outline" class="delete"></ion-icon>
                   `;
                        const name = row[0]; //first row
                        const number = row[1].toString(); //second row
                        this.playerDataLoadFile = new PlayerDataLoadFile(name, number);

                        for (const i in this.players) {
                            if (number === this.players[i].number) {
                                alert(`Zawodnik o numerze ${number} już istnieje`);
                                return;
                            }
                        }
                        playersList.push(rows);
                        this.renderList();
                        containerList.appendChild(rows);
                        this.storeAddPlayer(this.playerDataLoadFile);
                    } else {
                        return alert('dołącz plik')
                    }
                })
            })
            .catch(error => console.log(error))
    }

    //add item to list
    addPlayerToList(player, inputNr) {
        if (player) {
            for (const i in this.players) {
                if (inputNr === this.players[i].number) {
                    alert(`Zawodnik o numerze ${inputNr} już istnieje`);
                    return;
                }
            }
            const containerList = this.containerList;
            const row = document.createElement('div');
            row.className = 'player-item';
            row.innerHTML = `
                           <h5>${player.name}</h5>
                           <p>${player.number}</p>
                           <div class="lamp"></div>
                           <ion-icon name="close-outline" class="delete"></ion-icon>
                   `;

            this.playersList.push(row);
            this.renderList();
            containerList.appendChild(row);
            this.clearFields();
        }
    }

    //clear inputs
    clearFields() {
        document.getElementById('name-player').value = '';
        document.getElementById('nr-player').value = ''
    }

    //set key data for player item
    renderList() {
        this.playersList.forEach((player, key) => {
            player.dataset.key = key;
            this.containerList.appendChild(player);
        })
    }

    //remove item from list
    deletePlayer(el) {
        const index = el.parentElement.dataset.key;
        if (el.classList.contains('delete')) {
            el.parentElement.remove();
            this.playersList.splice(index, 1);
            this.renderList()
        }
    }

    //clear list and local storage
    clearList() {
        if (this.playersList.length > 0) {
            localStorage.clear();
            this.playersList.splice(0);
            this.containerList.textContent = '';
            this.players = []
        } else return
    }

    //localStorage array
    storeGetPlayer() {
        let players;
        if (localStorage.getItem('players') === null) {
            players = []
        } else {
            players = JSON.parse(localStorage.getItem('players'))
        }
        return players
    }

    //add item to localStorage
    storeAddPlayer(player, inputNr) {
        if (player) {
            for (const i in this.players) {
                if (inputNr === this.players[i].number) return;
            }
            this.players.push(player);
            localStorage.setItem('players', JSON.stringify(this.players))
        }
    }

    //remove item from localStorage
    storeRremovePlayer(el) {
        const index = el.parentElement.dataset.key;
        if (el.classList.contains('delete')) {
            this.players.splice(index, 1);
            localStorage.removeItem(index)
        }
        localStorage.setItem('players', JSON.stringify(this.players))
    }
}
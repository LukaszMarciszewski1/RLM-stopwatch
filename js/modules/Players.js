import {
    PlayerDataLoadFile
} from './PlayerDataLoadFile.js';
export class Players {
    constructor(playersList, containerList, inputLoad) {
        this.playersList = playersList
        this.containerList = containerList
        this.inputLoad = inputLoad
        this.playerDataLoadFile = null
    }

    displayPlayer() {
        const players = this.storeGetPlayer()
        players.forEach((player) => this.addPlayerToList(player))
    }

    //load player list xlsx file
    loadPlayerList() {
        let file = this.inputLoad.files[0]
        readXlsxFile(file).then((data) => {
            const containerList = this.containerList
            const playersList = this.playersList

            data.map((row, index) => {
                if(file){
                    const rows = document.createElement('div')
                    rows.className = 'player-item'
                    rows.innerHTML = `
                   <h5>${row[0]}</h5>
                   <p>${row[1]}</p>
                   <div class="lamp"></div>
                   <ion-icon name="close-outline" class="delete"></ion-icon>
                   `;
                    const name = row[0]
                    const number = row[1].toString()  
                    this.playerDataLoadFile = new PlayerDataLoadFile(name, number)
    
                    playersList.push(rows)
                    this.renderList()
                    containerList.appendChild(rows)
                    this.storeAddPlayer(this.playerDataLoadFile)
                }
                 else{
                     return alert('dołącz plik')
                 }
            })
        })
        .catch( error =>  console.log(error) )
    }

    addPlayerToList(player) {
        const containerList = this.containerList
        const row = document.createElement('div')
        row.className = 'player-item'
        row.innerHTML = `
                   <h5>${player.name}</h5>
                   <p>${player.number}</p>
                   <div class="lamp"></div>
                   <ion-icon name="close-outline" class="delete"></ion-icon>
           `;

        this.playersList.push(row)
        this.renderList()
        containerList.appendChild(row)
        this.clearFields()
    }

    clearFields() {
        document.getElementById('name-player').value = ''
        document.getElementById('nr-player').value = ''
    }

    renderList() {
        this.playersList.forEach((player, key) => {
            player.dataset.key = key;
            this.containerList.appendChild(player);
        })
    }

    deletePlayer(el) {
        const index = el.parentElement.dataset.key;
        if (el.classList.contains('delete')) {
            el.parentElement.remove();
            this.playersList.splice(index, 1)
            this.renderList()
        }
    }

    clearList(containerList) {
        if (this.playersList.length > 0) {
            localStorage.clear()
            this.playersList = []
            containerList.textContent = ''
        } else return
    }

    //localStorage
    storeGetPlayer() {
        let players;
        if (localStorage.getItem('players') === null) {
            players = [];
        } else {
            players = JSON.parse(localStorage.getItem('players'))
        }
        return players
    }

    storeAddPlayer(player) {
        const players = this.storeGetPlayer()
        players.push(player)
        localStorage.setItem('players', JSON.stringify(players))
    }

    storeRremovePlayer(el) {
        const players = this.storeGetPlayer()
        const index = el.parentElement.dataset.key;
        if (el.classList.contains('delete')) {
            players.splice(index, 1)
        }
        localStorage.setItem('players', JSON.stringify(players));
    }
}
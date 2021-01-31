
export class Players {
    constructor(playersList, list) {
        this.playersList = playersList
        this.list = list
    }

   displayPlayer(){
        const players = this.storeGetPlayer()
        players.forEach((player) => this.addPlayerToList(player))
    }

    addPlayerToList(player) {
        const list = this.list
        const row = document.createElement('div')
        row.className = 'name'
        row.innerHTML = `
                   <h4>${player.name}</h4>
                   <p>${player.number}</p>
                   <div class="lamp"></div>
                   <ion-icon name="close-outline" class="delete"></ion-icon>
           `;

        this.playersList.push(row)
        this.renderList()
        list.appendChild(row)
        this.clearFields()
    }

    clearFields(){
        document.getElementById('name-player').value = ''
        document.getElementById('nr-player').value = ''
    }

    renderList() {
        this.playersList.forEach((player, key) => {
            player.dataset.key = key;
            this.list.appendChild(player);
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

    clearList(list){
        if(this.playersList.length > 0){
            localStorage.clear()
            this.playersList = []
            list.textContent = ''
        }
        else return 
    }

//localStorage
    storeGetPlayer(){
        let players;
        if(localStorage.getItem('players') === null) {
            players =[];
        } else {
            players = JSON.parse(localStorage.getItem('players'))
        }
        return players
        }

        storeAddPlayer(player){
         const players = this.storeGetPlayer()
         players.push(player)
         localStorage.setItem('players', JSON.stringify(players))
        }

        storeRremovePlayer(el){
         const players = this.storeGetPlayer()
            const index = el.parentElement.dataset.key;
            if (el.classList.contains('delete')) {
                players.splice(index, 1)
            }
         localStorage.setItem('players', JSON.stringify(players));
        }
}
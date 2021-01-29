export class AddPlayer {
    constructor(name, number, playerList, list) {
        this.name = name;
        this.number = number
        this.playerList = playerList
        this.list = list
    }
    addPlayerToList() {
        if (this.name.value === "" || this.number.value === "") return alert('uzupełnij pole');
        const list = this.list
        const player = document.createElement('div')
        player.className = 'name'
        player.innerHTML = `
                   <h4>${this.name.value}</h4>
                   <p>${this.number.value}</p>
                   <div class="lamp"></div>
                   <ion-icon name="close-outline" class="delete"></ion-icon>
           `;

        this.playerList.push(player)
        this.renderList()
        list.appendChild(player)
        this.name.value = ''
        this.number.value = ''
    }
    renderList() {
        // this.playerList.textContent = "";
        this.playerList.forEach((player, key) => {
            player.dataset.key = key;
            this.list.appendChild(player);
        })
    }
    deletePlayer(el, active) {
        if (el.classList.contains('delete')) {
            el.parentElement.remove();
            const index = el.parentElement.dataset.key;
            this.playerList.splice(index, 1)
            this.renderList()
        }
    }
}
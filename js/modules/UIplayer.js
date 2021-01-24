export class UIplayer{
    displayPlayer(){
      const storedPlayers = [
            {
                name: 'Kacper Baltazar',
                number: 9
            },
            {
                name: 'Jacek Sasin',
                number: 8
            }
        ]
        const players = storedPlayers
        players.forEach(player => UIplayer.addPlayerToList(player))
    }
    addPlayerToList(player) {
     const list = document.querySelector('.list-container')
     const row = document.createElement('div')
     row.className = 'list__item'
     row.innerHTML = `
            <div class="name">
            <h4>${player.name}</h4>
            <p>${player.number}</p>
            <div class="lamp"></div>
            </div>
        `;

    list.appendChild(row)    
    }
}
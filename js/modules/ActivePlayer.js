export class ActivePlayer {
  constructor(playersList) {
    this.playersList = playersList;
    this.activeList = []
    this.activeContainer = document.querySelector('.active-player-name')
    this.nextContainer = document.querySelector('.next-player-name')
  }
  getPlayerPrepare(active) {
    //index of array in this.playerList
    const name = 0; 
    const status = 2;
    const deleteEl = 3

    if (active < this.playersList.length) {
      const deletePlayer = this.playersList[active].children[deleteEl]
      const namePlayer = this.playersList[active].children[name]
      const statusPlayer = this.playersList[active].children[status]

      this.activeList.push(statusPlayer)
      statusPlayer.classList.add('lamp--prepare')
      setTimeout(() => {
        this.activeContainer.textContent = namePlayer.textContent
      }, 1000);

      if(active < this.playersList.length - 1){
        const nextNamePlayer = this.playersList[active].nextElementSibling.children[name]
        setTimeout(() => {
          this.nextContainer.textContent = nextNamePlayer.textContent
        }, 1000);
      }
      if(active === this.playersList.length - 1){
        this.nextContainer.textContent = ''
      }

      else return
      }
      else if(active === this.playersList.length){
        setTimeout(() => {
          this.activeContainer.textContent = ''
        }, 1000);
      }
      else return

  }
  getPlayerActive() {
    const active = this.activeList.find(el => el.classList.contains('lamp--prepare'))
    if (active) {
      active.classList.remove('lamp--prepare')
      active.classList.add('lamp--active')
    } else return

  }
}

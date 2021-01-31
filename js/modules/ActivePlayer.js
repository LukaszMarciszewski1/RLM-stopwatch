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
    // const number = 1;
    const status = 2;
    const deleteEl = 3

    if (active < this.playersList.length) {
      const deletePlayer = this.playersList[active].children[deleteEl]
      const namePlayer = this.playersList[active].children[name]
      // const numberPlayer = this.playerList[active].children[number]
      const statusPlayer = this.playersList[active].children[status]

      this.activeList.push(statusPlayer)
      statusPlayer.classList.add('lamp--prepare')
      this.activeContainer.textContent = namePlayer.textContent

      if(active < this.playersList.length - 1){
        const nextNamePlayer = this.playersList[active].nextElementSibling.children[name]
        this.nextContainer.textContent = nextNamePlayer.textContent
      }
      if(active === this.playersList.length - 1){
        console.log('ostatni')
        this.nextContainer.textContent = ''
      }

      else return
      }
      else if(active === this.playersList.length){
        this.activeContainer.textContent = ''
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

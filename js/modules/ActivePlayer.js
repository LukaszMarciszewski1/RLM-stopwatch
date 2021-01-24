export class ActivePlayer {
  constructor(playerList) {
    this.playerList = playerList;
    this.activeList = []
  }

  getPlayerPrepare(active) {
    const prepareElement = this.playerList[active]
    if (active < this.playerList.length) {
      prepareElement.classList.add('lamp--prepare')
      this.activeList.push(prepareElement)
    } else return
    console.log(prepareElement)
  }
  getPlayerActive() {
    const element = this.activeList.find(el => el.classList.contains('lamp--prepare'))
    if (element) {
      element.classList.remove('lamp--prepare')
      element.classList.add('lamp--active')
    } else return
  }
}
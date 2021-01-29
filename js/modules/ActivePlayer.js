export class ActivePlayer {
  constructor(playerList, playerName) {
    this.playerList = playerList;
    this.playerName = playerName;
    this.activeList = []
    this.activeContainer = document.querySelector('.active-player-name')
    this.nextContainer = document.querySelector('.next-player-name')
  }
  //lastElementChild
  showList(){
    console.log(this.playerName)
  }
  getPlayerPrepare(active) {
    //index of array in this.playerList
    const name = 0; 
    // const number = 1;
    const status = 2;
    const deleteEl = 3

    if (active < this.playerList.length) {
      const deletePlayer = this.playerList[active].children[deleteEl]
      const namePlayer = this.playerList[active].children[name]
      // const numberPlayer = this.playerList[active].children[number]
      const statusPlayer = this.playerList[active].children[status]

      this.activeList.push(statusPlayer)
      statusPlayer.classList.add('lamp--prepare')
      this.activeContainer.textContent = namePlayer.textContent

      if(active < this.playerList.length - 1){
        const nextNamePlayer = this.playerList[active].nextElementSibling.children[name]
        this.nextContainer.textContent = nextNamePlayer.textContent
      }
      if(active === this.playerList.length - 1){
        console.log('ostatni')
        this.nextContainer.textContent = ''
      }
      else return
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


    // const prepareElement = this.statusList[active]
    // const activePlayerName = this.playerName[active]
    // const nextPlayerName = this.playerName[active + 1]

    // if (active < this.playerList.length) {
    //   prepareElement.classList.add('lamp--prepare')
    //   this.activeList.push(prepareElement)
    //   this.activeContainer.textContent=activePlayerName.textContent

    //   if(active < this.playerList.length - 1){
    //     this.nextContainer.textContent=nextPlayerName.textContent
    //   }
    //   if(active === this.playerList.length - 1){
    //     this.nextContainer.textContent=''
    //   }
    //   else return
    // } 
    // else return

    // const prepareElement = this.playerList[active]
    // if(active < this.playerList.length){
    //   prepareElement.classList.add('lamp--prepare')
    //   this.activeList.push(prepareElement)
    // }
     

    // if (active < this.playerList.length) {
    //   const prepareElement = this.playerList[active].firstElementChild
    //   this.activeList.push(prepareElement)
    //   const namePlayerActive = this.playerList[active].firstElementChild.textContent
    //   prepareElement.classList.add('lamp--prepare')
    //   this.activeContainer.textContent=namePlayerActive
    //   const namePlayerNext = this.playerList[active].nextElementSibling.firstElementChild.textContent
    //   this.nextContainer.textContent=namePlayerNext
      
    //   if(active === this.playerList.length){
    //     this.nextContainer.textContent=''
        
    //     console.log('okk')
    //   }
    // console.log(namePlayerNext)
    // console.log(this.playerName)

    // }
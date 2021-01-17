export class Players {
  constructor(playerList) {
    this.playerList = document.querySelectorAll(playerList);
    this.statusLamp = this.playerList.forEach(player => player.nextElementSibling)
  }
  startPlayers(time) {
    let active = 0
    this.playerList[active].nextElementSibling.classList.add('lamp--preparation')
    const status = setInterval(() => {
      active++
      this.playerList[active].nextElementSibling.classList.add('lamp--preparation')
      console.log(active)
      if(active >= this.playerList.length - 1){
        clearInterval(status)
        console.log('end')
      }
    }, time)
  }
}


// const startTime = '2021-01-05 22:17:10'
// let nowTime = document.querySelector('.time-now span')
// const loadList = document.querySelectorAll('.load')
// let number = 5
// const clock = () => {
//     const time = new Date();
//     const endTime = new Date(startTime).getTime()
//     const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
//     const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
//     const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();

//     nowTime.textContent = `${hours}:${minutes}:${seconds}`
// }
// setInterval(clock, 1000);

// let active = 0

// const load = ()=>{
// loadList[active].classList.add('load--active')
// loadList[active].nextElementSibling.classList.add('lamp--active')
// active++
// if(active>=loadList.length){
//     active = 0
// }
// }
// const btn = document.querySelector('.start')
// btn.addEventListener('click', ()=>{
//     setInterval(load, 5000)
//     btn.lastChild.textContent = 'pasue'
//     setTimeout(counter, 4000)
// })


// const counter = () =>{
//   setInterval(()=>{
//         number--
//         const counterSpan = document.querySelector('.stoper span')
//         if(startTime === '2021-01-05 22:17:10'){
//             counterSpan.textContent = number + 1
//         }
//         if(number === 0){
//             number = 5
//         }
//     }, 1000);
// }

// if(active === loadList.length){
//     console.log('okkk')
// }
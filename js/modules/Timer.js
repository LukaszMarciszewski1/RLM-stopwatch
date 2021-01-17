export class Timer {
    constructor(timerSpan) {
        this.timerSpan = document.querySelector(timerSpan)
        this.timeInterval = 10;
        this.startTimer = this.startTimer.bind(this);
    }
    startTimer() {
        const progressBar = new ProgressBar.Circle('#progress', {
            color: '#00d9f6',
            strokeWidth: 6,
            duration: 10000,
            easing: 'linear'
        });
        progressBar.animate(1);
        setInterval(function () {
            progressBar.set(0);
            progressBar.animate(1);
        }, 10000);
        setInterval(() => {
            this.timeInterval--
            this.timerSpan.textContent = this.timeInterval
            if (this.timeInterval === 1) this.timeInterval += 10
        }, 1000)
    }
}


// function loop() {
//     timer.set(0);
//     timer.setText('Work');
//     timer.animate(1, {
//       duration: 25000
//     }, function() {
//       timer.set(0);
//       timer.setText('Break');
//       timer.animate(1, {
//         duration: 5000
//       },loop);
//     });

//     loop(); //remove
//   }
//   loop();//add



// window.onload = function onLoad() {
//     var progressBar = 
//       new ProgressBar.Circle('#progress', {
//         color: '#00d9f6',
//         strokeWidth: 6,
//         duration: 10000,
//         easing: 'linear'
//       });

//     progressBar.animate(1); 
//   };




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
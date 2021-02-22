export class Stopwatch {
    constructor(timerSpan, end) {
        this.timerSpan = timerSpan
        this.circleAnimation
        this.stopwatchCounter
        this.access = true
        this.end = end
    }
    startTimer(timeSet, timeInterval) {
        let time = timeSet

        const progressBar = new ProgressBar.Circle('#progress', {
            color: '#00d9f6',
            strokeWidth: 5,
            duration: timeInterval,
            easing: 'linear'
        });
        progressBar.animate(1);

        this.circleAnimation = setInterval(function () {
            progressBar.set(0);
            progressBar.animate(1);
        }, timeInterval);

        this.stopwatchCounter = setInterval(() => {
            timeSet--
            this.timerSpan.textContent = timeSet
            if (timeSet === 1) timeSet += time
            if (timeSet === time){
                this.timerSpan.textContent = 'START'
                this.timerSpan.classList.add('span-start--active')
            }
            else{
                this.timerSpan.classList.remove('span-start--active')
            }
        }, 1000)
    }
    stopTimer(active, list) {
        if (active === list.length) {
            this.access = false
            clearInterval(this.circleAnimation)
            setTimeout(()=>{
                clearInterval(this.stopwatchCounter)
                this.timerSpan.textContent = this.end
            }, 1000)
        
        }
    }
    showStartTxt(access) {
        const loader = document.querySelector('.lds-ellipsis')
        const activePlayerTxt = document.querySelector('.active-player-name')
        console.log(activePlayerTxt.textContent)
        //setInterval delay this.timerSpan.textContent === '1'
        if (this.timerSpan.textContent === '1') {
            loader.classList.remove('lds-ellipsis--active')
            activePlayerTxt.classList.add('active-player-name--start')
        } else {
            activePlayerTxt.classList.remove('active-player-name--start')
            loader.classList.add('lds-ellipsis--active')
        }
        if (this.timerSpan.textContent === this.end) {
            activePlayerTxt.classList.remove('active-player-name--start')
        }
        if(access === 0){
            if(activePlayerTxt.textContent === ''){
                loader.classList.remove('lds-ellipsis--active')
            }
        }
    }
}
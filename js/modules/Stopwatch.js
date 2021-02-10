export class Stopwatch {
    constructor(timerSpan) {
        this.timerSpan = document.querySelector(timerSpan)
        this.circleAnimation
        this.stopwatchCounter
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
        }, 1000)
    }
    stopTimer(active, list){
        if(active === list.length){
            clearInterval(this.stopwatchCounter)
            this.timerSpan.textContent = 0
        }
        if(active === list.length){
            clearInterval(this.circleAnimation)
        }
    }
}

export class Stopwatch {
    constructor(timerSpan, timeInterval, timeSet) {
        this.timerSpan = document.querySelector(timerSpan)
        this.timeSet = timeSet;
        this.timeInterval = timeInterval
        this.timerSpan.textContent = timeSet
        this.circleAnimation
        this.stopwatchCounter
        // this.startTimer = this.startTimer.bind(this);
    }
    startTimer(time) {
        const progressBar = new ProgressBar.Circle('#progress', {
            color: '#00d9f6',
            strokeWidth: 6,
            duration: this.timeInterval,
            easing: 'linear'
        });
        progressBar.animate(1);

        this.circleAnimation = setInterval(function () {
            progressBar.set(0);
            progressBar.animate(1);
        }, this.timeInterval);

        this.stopwatchCounter = setInterval(() => {
            this.timeSet--
            this.timerSpan.textContent = this.timeSet
            if (this.timeSet === 1) this.timeSet += time
        }, 1000)
    }
    stopTimer(active, list){
        if(active === list.length){
            clearInterval(this.stopwatchCounter)
            this.timerSpan.textContent = 0
        }
        if(active === list.length - 1){
            clearInterval(this.circleAnimation)
        }
    }
}

export class Stopwatch {
    constructor(timerSpan, end, blueColor) {
        this.timerSpan = timerSpan;
        this.circleAnimation;
        this.stopwatchCounter;
        this.access = true;
        this.end = end;
        this.blueColor = blueColor
    }

    //circle stopwatch
    startTimer(timeSet, timeInterval) {
        let time = timeSet;
        //progress animation with a time interval
        const progressBar = new ProgressBar.Circle('#progress', {
            color: this.blueColor,
            strokeWidth: 5,
            duration: timeInterval,
            easing: 'linear'
        });
        progressBar.animate(1);

        this.circleAnimation = setInterval(function () {
            progressBar.set(0);
            progressBar.animate(1);
        }, timeInterval);

        //countdown time interval in a circle
        this.stopwatchCounter = setInterval(() => {
            timeSet--
            this.timerSpan.textContent = timeSet;
            if (timeSet === 1) timeSet += time;
            if (timeSet === time) {
                this.timerSpan.textContent = 'START';
                this.timerSpan.classList.add('span-start--active')
            } else {
                this.timerSpan.classList.remove('span-start--active')
            };
        }, 1000)
    }

    //stop the progress and countdown animation in a circle
    stopTimer(active, list) {
        if (active === list.length) {
            this.access = false;
            clearInterval(this.circleAnimation);
            setTimeout(() => {
                clearInterval(this.stopwatchCounter);
                this.timerSpan.textContent = this.end
            }, 1000);
        }
    }

   //information about the active player and the next player and animation of loading in the container
    changePrepareName() {
        const loader = document.querySelector('.lds-ellipsis');
        const activePlayerTxt = document.querySelector('.active-player-name');
        //setInterval delay this.timerSpan.textContent === '1'
        if (this.timerSpan.textContent === '1') {
            loader.classList.remove('lds-ellipsis--active');
            activePlayerTxt.classList.add('active-player-name--start')
        } else {
            activePlayerTxt.classList.remove('active-player-name--start');
            loader.classList.add('lds-ellipsis--active')
        };
        
        if (this.timerSpan.textContent === this.end || this.access === false) {
            activePlayerTxt.classList.remove('active-player-name--start');
            loader.classList.remove('lds-ellipsis--active')
        }
    }
}
export class Restart {
    constructor(btnStart, btnRestart) {
        this.btnStart = btnStart;
        this.btnRestart = btnRestart
    }

    //displaying the start or restart button
    displayBtn(access) {
        if (access) {
            this.btnRestart.classList.add('restart-disable');
            this.btnStart.classList.remove('start-disable')
        } else {
            this.btnRestart.classList.remove('restart-disable');
            this.btnStart.classList.add('start-disable')
        };
    }
    
    //after pressing the start button, restart is displayed
    changeBtn() {
        this.btnStart.classList.remove('start-disable');
        this.btnRestart.classList.add('restart-disable')
    }
}
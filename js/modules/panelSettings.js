export class PanelSettings{
    constructor(open, close, container){
        this.openBtn = document.querySelector(open);
        this.closeBtn = document.querySelector(close);
        this.container = document.querySelector(container)
        this.openPanel()
        this.closePanel()
    }
    openPanel(){
        this.openBtn.addEventListener('click', ()=>{
            this.container.classList.add('settings-container--active')
        })
    }
    closePanel(){
        this.closeBtn.addEventListener('click', ()=>{
            this.container.classList.remove('settings-container--active')
        })
    }
}
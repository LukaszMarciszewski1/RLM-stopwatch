export class PanelSettings{
    constructor(open, close, container, popup, accept){
        this.openBtn = open
        this.closeBtn = close
        this.container = container
        this.infoPopup = popup
        this.acceptPopup = accept
        this.openPanel()
        this.closePanel()
        this.popupClose()
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
    openPopup(){
        this.infoPopup.classList.add('info-popup--active')
    }
    popupClose(){
        this.acceptPopup.addEventListener('click', ()=> this.infoPopup.classList.remove('info-popup--active'))
    }
}
export class PanelSettings{
    constructor(container, popup){
        this.container = container
        this.infoPopup = popup

        this.openPanel = () => {
            this.container.classList.add('settings-container--active')
        }

        this.closePanel = () => {
            this.container.classList.remove('settings-container--active')
        }
        
        this.openPopup = () => {
            this.infoPopup.classList.add('info-popup--active')
        }

        this.popupClose = () => {
            this.infoPopup.classList.remove('info-popup--active')
        }
    }

}
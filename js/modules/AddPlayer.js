export class AddPlayer{
    constructor(name, number){
      this.name = name;
      this.number = number
    }
    addPlayerToList(player) {
        const list = document.querySelector('.list-container')
        const row = document.createElement('div')
        row.className = 'list__item'
        row.innerHTML = `
               <div class="name">
               <h4>${player.name}</h4>
               <p>${player.number}</p>
               <div class="lamp"></div>
               </div>
           `;
   
       list.appendChild(row)    
       }

    showPlayer(){
        console.log(this.name)
    }   
}
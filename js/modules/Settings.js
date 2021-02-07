
export class Settings {
   //the interval is equal to the selector value
   constructor(number, selectTime) {
      this.number = number
      this.selectTime = selectTime
      this.access = null

      this.count = () => {
         let count = parseInt(document.getElementById(this.number).value);
         return count
      }
   }

   countdownTime(deadlineTime) {
      let deadline = deadlineTime.value
      const endTime = new Date(deadline).getTime();
      
      
       const nowTime = new Date().getTime();

       let hours = Math.floor((endTime / (1000 * 60 * 60) - nowTime / (1000 * 60 * 60)) % 24);
       let minutes = Math.floor((endTime / (1000 * 60) - nowTime / (1000 * 60)) % 60);
       // (+1 bag) one second is faster
       let seconds = Math.floor(((endTime / 1000 - nowTime / 1000) % 60) + 1)
              hours = hours < 10 ? `0${hours}` : hours;
              minutes = minutes < 10 ? `0${minutes}` : minutes;
              seconds = seconds < 10 ? `0${seconds}` : seconds;

            //display countdown  
            if(isNaN(endTime)){
               this.selectTime.style.display = 'none'
            }
            else{
               this.selectTime.style.display = 'inline'  
            }
            // let letStart = Math.floor(((endTime / 1000 - nowTime / 1000) % 60) + 1)
            this.access = Math.sign(seconds)   
          if(this.access > 0 ){
            this.selectTime.textContent = `${hours}:${minutes}:${seconds}`
          }     
          else{
            this.selectTime.textContent = '00:00:00'
          }
          
  }

  canStart(){
  return this.access 
}

}






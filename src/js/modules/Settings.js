export class Settings {
   //the interval is equal to the selector value
   constructor(number, selectTime) {
      this.number = number;
      this.selectTime = selectTime;
      this.access = null;
      this.beforeBeginning = null

      this.count = () => {
         //time interval setting
         let count = parseInt(document.getElementById(this.number).value);
         return count
      }
   }

   //timer counting down to start
   countdownTime(deadlineTime) {
      let deadline = deadlineTime.value;
      const endTime = new Date(deadline).getTime();
      const nowTime = new Date().getTime();

      let hours = Math.floor((endTime / (1000 * 60 * 60) - nowTime / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((endTime / (1000 * 60) - nowTime / (1000 * 60)) % 60);
      // (+1 bag) one second is faster
      let seconds = Math.floor(((endTime / 1000 - nowTime / 1000) % 60) + 1);
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      //display countdown  
      if (isNaN(endTime)) {
         this.selectTime.style.display = 'none'
      } else {
         this.selectTime.style.display = 'inline'
      };
      
      //access can start, information whether the seconds are positive or negative in the countdown clock
      this.access = Math.sign(seconds);
      //sum of seconds remaining before start
      this.beforeBeginning = ((hours * 60) * 60) + (minutes * 60) + seconds;

      if (this.access > 0) {
         this.selectTime.textContent = `${hours}:${minutes}:${seconds}`
      } else {
         this.selectTime.textContent = '00:00:00'
      }
   }

   canStart() {
      //access information from the countdownTime method
      return this.access
   }
   secondsToStart() {
      //information about the total seconds to start from countdownTime method
      return parseInt(this.beforeBeginning)
   }

}
import {
   Time
} from './Time.js';
export class Settings {
   //the interval is equal to the selector value
   constructor(number, select) {
      this.number = number
      this.select = select

      this.count = () => {
         let count = parseInt(document.getElementById(this.number).value);
         return count
      }

      this.time = () =>{
         const time = new Date();
         const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
         const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
         const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
         const nowTime = `${hours}:${minutes}:${seconds}`
         const select = this.select.value
         // if(select === nowTime){
         //    console.log('ok')
         // }
         
      }
   }

}
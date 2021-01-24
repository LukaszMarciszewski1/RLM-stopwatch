export class Settings{
   //the interval is equal to the selector value
 constructor(number){
     this.number = number
     this.count = () => {
     let count = parseInt(document.getElementById(this.number).value);
     return count
  }
 }
}
import {Date} from './date.js';

export class dateObject {

  constructor(date1,date2){
/*    console.log("constructing dateObject...")*/
  if (typeof date1 === "undefined" || typeof date2 === "undefined") {
    throw new Error("dateObject argument incomplete !");
  }
  else {
    this.date1 = new Date(date1);
    this.date2 = new Date(date2);
    this.earlierdate = null;
    this.laterdate = null;
    this.difference = null;
  }

/*    console.log("printing the object constructed",this);*/
  }
}
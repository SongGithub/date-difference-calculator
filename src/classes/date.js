export class Date {


  constructor(dateString) {
    let dateStringSplit = dateString.split(" ");
/*    console.log('constructing a new date:');*/
    if (dateStringSplit.length != 3){
      throw new Error("date format error!");
    }
    else {
      this.day = parseInt(dateStringSplit[0]);
      this.month = parseInt(dateStringSplit[1]);
      this.year = parseInt(dateStringSplit[2]);
    }
/*    console.log("date-object build result= ", this);*/
   }
}


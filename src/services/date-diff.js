// take dateObjects and calculate diff in days + set earlier/later dates in the dateObject.

export class calculateDateDiff {

  constructor(dateObject){
    this.obj = dateObject
    console.log('calculateDateDiff Constructing...', this.obj)
  }

  calculateDiff() {
    for (let object of this.obj) {
      // NOD = Number of Days
/*      console.log("calculate no-1",this.calculateNumberOfDays(object['date1']));*/
      let NOD1 = this.calculateNumberOfDays(object['date1']);

/*      console.log("calculate no-2",this.calculateNumberOfDays(object['date2']));*/
      let NOD2 = this.calculateNumberOfDays(object['date2']);

      let diff = NOD2 - NOD1
/*      console.log(object,"diff is", NOD2-NOD1);*/
      object.difference = Math.abs(diff);
      if (diff < 0 ) {
        object['earlierdate'] = object['date2'];
        object['laterdate'] = object['date1'];
      }
      else {
        object['earlierdate'] = object['date1'];
        object['laterdate'] = object['date2'];
      }
    }
  }

  calculateNumberOfDays(date) {
/*    console.log("calculateNumberOfDays: ",date.day, date.month, date.year)*/
    let day = date.day;
    let month = date.month;
    let year = date.year;

    if ( month == 1 || month == 2) {
      month += 12;
      year -= 1;
    }
    return 365*year + Math.floor(year/4) - Math.floor(year/100) + Math.floor(year/400) + day + Math.floor((153*month+8)/5)
  }
}
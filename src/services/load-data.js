// load data and feed data-model with data in correct format
import {Date} from '../classes/date.js';
import {dateObject} from '../classes/date-objects.js'
import {DataError} from './handle-data-error.js'


export class loadDataService {


  constructor(){
    console.log("Constructing loadDateService...")
    this.inputDataObjects = [];
    this.errors = [];
  }

  loadData(inputData) {
    console.log("Number of data loaded:",inputData.length)
    for (let data of inputData) {
      console.log(data)
      let dataArray = data['inputDatePair'];
      try {
        let date1 = data['inputDatePair'][0];
        let date2 = data['inputDatePair'][1];
        let dateObj = new dateObject(date1,date2)
        this.validateData(dateObj)
        // following clause won't run unless no error was thrown at previous validation step
        this.inputDataObjects.push(dateObj);
      } catch(e) {
        if (dataArray == undefined) {
          this.errors.push(new DataError('error loading date string', data));
        }
        else if (dataArray.length < 2) {
          this.errors.push(new DataError('At least one of the date strings missing', data));
        }
        else {
          this.errors.push(new DataError(e.message, data));
        }
        console.log(this.errors,"Reasons: ", e);
      }
    }
    console.log("showing loaded inputDataObjects",this.inputDataObjects)
  }

  validateData(dateObj) {
  //validates input data against required constrains and implied constrains.
/*    console.log("Validating data...")*/
    let date1 = dateObj.date1;
    let date2 = dateObj.date2;
    let dateArray = [date1,date2];
    for (let i of dateArray) {
      if (i.day < 1 || i.day > 31 || Number.isNaN(i.day)) {
/*        console.log("day is invalid")*/
        throw new Error("DAY IS INVALID");
      }
      else if (i.month < 1 || i.month > 12 || Number.isNaN(i.month)) {
/*        console.log("month is invalid");*/
        throw new Error("MONTH IS INVALID");
      }

      else if (i.year < 1900 || i.year > 2010 || Number.isNaN(i.year)){
/*        console.log("year is invalid", i.year);*/
        throw new Error("YEAR IS INVALID: "+i.year);
      }

      // in month 4,6,9,11, there are exactly 30 days.
      else if ([4,6,9,11].includes(i.month) && i.day == 31) {
/*        console.log("day-month is invalid", i.month);*/
        throw new Error("THERE IS ONLY 30 DAYS IN THIS MONTH: ");
      }

      // Common years' Feb has 28 days, while Leap years' Feb has 29
      else if (i.month == 2) {
        // Leap Year
        if (i.year % 400 == 0 || (i.year % 100 != 0 && i.year % 4 ==0)) {
          if (i.day > 29) {
            throw new Error("THERE IS ONLY 29 DAYS IN MONTH of leap year and no more: ");
          }
        }
        else if (i.day > 28) {
            throw new Error("THERE IS ONLY 28 DAYS IN MONTH of common year and no more: ");
        }
      }
    }
  }
}

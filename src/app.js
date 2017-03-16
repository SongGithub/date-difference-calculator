import $ from 'jquery';

import {Date} from './classes/date.js';
import {loadDataService} from './services/load-data.js';
import {inputData} from './input-data.js'
import {DataError} from './services/handle-data-error.js'
import {calculateDateDiff} from './services/date-diff.js'
import {DataTable} from './ui/data-table.js'

// loads data with correct formats (2 date strings), & validates
let loaddata = new loadDataService();
loaddata.loadData(inputData);
console.log('DATA LOADED...');
console.log(loaddata.inputDataObjects, loaddata.errors)

// calculate diff
let dateDiff = new calculateDateDiff(loaddata.inputDataObjects)
dateDiff.calculateDiff()


/*for (let inputs of loaddata.inputDataObjects) {
  console.log("looping thru...",inputs)
}*/


// log errors during data loading
for ( let e of loaddata.errors)
  console.log(e.message);

//export result
let headers = "EarlierDate LaterDate Difference".split(' ');
console.log(loaddata.inputDataObjects);
let dt = new DataTable(headers, loaddata.inputDataObjects);
dt.appendToElement($('body'));

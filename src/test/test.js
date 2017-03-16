let chai = require('chai'),
    path = require('path'),
    expect = chai.expect,
    assert = chai.assert;

chai.should();

import {Date} from '../classes/date.js';
import {dateObject} from '../classes/date-objects.js';
import {calculateDateDiff} from '../services/date-diff.js';
import {loadDataService} from '../services/load-data.js';
import {inputData} from '../input-data.js';

/*let Date = require(path.join(__dirname, '../classes/date.js'))*/

/*describe('A basic test', function () {
  it('should pass when everything is okay', function(){
    true.should.be.true;
  });
});*/

describe('classes/Date', function() {
  let testDate = new Date("11 02 2010");

  it('should construct a Date object', function(){
    (typeof testDate).should.equal('object');
  });

  it('should has correct data', function(){
    testDate.day.should.equal(11);
    testDate.month.should.equal(2);
    testDate.year.should.equal(2010);
  });
});

describe('classes/Date error handling features', function() {

  it('should reject incorrect data format', function(){
    assert.throw(function(){
      new Date("1102 2010");
    }
      ,Error, "date format error!");
  });

  it('should reject incorrect data format', function(){
    assert.throw(function(){
      new Date("11022010");
    }
      ,Error, "date format error!");
  });

  it('should reject incorrect data format', function(){
    assert.throw(function(){
      new Date("");
    }
      ,Error, "date format error!");
  });
});

describe('classes/dateObject', function(){
  let testDateObject = new dateObject("11 02 1900", "12 12 2010");
  it('should construct a dateObject', function(){
    (typeof testDateObject).should.equal('object');
  });

  it('should have correct data', function(){
    JSON.stringify(testDateObject.date1).should.equal(JSON.stringify(new Date("11 02 1900")));
    JSON.stringify(testDateObject.date2).should.equal(JSON.stringify(new Date("12 12 2010")));
    testDateObject.earlierdate = null;
    testDateObject.laterdate = null;
    testDateObject.difference = null;
  });
});


describe('classes/dateObject error handling features', function(){
  it('should reject incomplete argument', function(){
    assert.throw(function(){
      new dateObject("11 02 1900");
    }
    , Error, "dateObject argument incomplete !");
  });
});

describe('services/load-data', function(){
  let loaddata = new loadDataService();
  loaddata.loadData(inputData);
  it('should load and triage valid vs invalid data correctly', function(){
    loaddata.inputDataObjects.length.should.equal(4);
    loaddata.errors.length.should.equal(10);
  });
});


describe('services/load-data.validators1', function(){
  let dataObj = {'date1':(new Date("01 01 1900")) ,'date2':new Date("01 01 1901")};
  let loadServiceInst = new loadDataService();
  it('should not throw error for valid input data', function(){
    assert.should.not.throw(function(){
      loadServiceInst.validateData(dataObj);
    });
  });
});

describe('services/load-data.validators2', function(){
  let dataObj = {'date1':(new Date('45 12 1900')) ,'date2':new Date("01 01 1901")};
  let loadServiceInst = new loadDataService();
  it('should throw error for day out-of-range', function(){
    assert.throw(function(){
      loadServiceInst.validateData(dataObj);
    }
    , Error, "DAY IS INVALID");
  });
});

describe('services/load-data.validators3', function(){
  let dataObj = {'date1':(new Date('12 42 1900')) ,'date2':new Date("01 01 1901")};
  let loadServiceInst = new loadDataService();
  it('should throw error for month out-of-range', function(){
    assert.throw(function(){
      loadServiceInst.validateData(dataObj);
    }
    , Error, "MONTH IS INVALID");
  });
});

describe('services/load-data.validators4', function(){
  let dataObj = {'date1':(new Date("01 01 1900")) ,'date2':new Date("01 01 2012")};
  let loadServiceInst = new loadDataService();
  it('should throw error for YEAR out-of-range >2010', function(){
    assert.throw(function(){
      loadServiceInst.validateData(dataObj);
    }
    , Error, "YEAR IS INVALID");
  });
});

describe('services/load-data.validators5', function(){
  let dataObj = {'date1':(new Date("01 01 1855")) ,'date2':new Date("01 01 1901")};
  let loadServiceInst = new loadDataService();
  it('should throw error for YEAR out-of-range < 1900', function(){
    assert.throw(function(){
      loadServiceInst.validateData(dataObj);
    }
    , Error, "YEAR IS INVALID");
  });
});

describe('services/load-data.validators6', function(){
  let dataObj = {'date1':(new Date("31 04 1900")) ,'date2':new Date("01 01 1901")};
  let loadServiceInst = new loadDataService();
  it('should throw error for incorrect day in a month', function(){
    assert.throw(function(){
      loadServiceInst.validateData(dataObj);
    }
    , Error, "THERE IS ONLY 30 DAYS IN THIS MONTH: ");
  });
});

describe('services/load-data.validators7', function(){
  let dataObj = {'date1':(new Date("01 01 1900")) ,'date2':new Date("29 02 2007")};
  let loadServiceInst = new loadDataService();
  it('should throw error for incorrect day in Feb', function(){
    assert.throw(function(){
      loadServiceInst.validateData(dataObj);
    }
    , Error, "THERE IS ONLY 28 DAYS IN MONTH of common year and no more: ");
  });
});


describe('services/date-diff', function(){
  let testDate = new Date("01 01 1900");
  let calculationInst = new calculateDateDiff(testDate);
  it('should return correct calculation result on number-of-days on lower boundary', function(){
    calculationInst.calculateNumberOfDays(testDate).should.equal(693995);
  });

  let testDate1 = new Date("31 12 2010");
  let calculationInst1 = new calculateDateDiff(testDate1);
  it('should return correct calculation result on number-of-days on upper boundary', function(){
    calculationInst.calculateNumberOfDays(testDate1).should.equal(734536);
  });

  let sampleObj=[{'date1':testDate,'date2':testDate1,'difference':null,'earlierdate':null,'laterdate':null}];
  let calculateDateDiffInst = new calculateDateDiff(sampleObj);
  calculateDateDiffInst.calculateDiff();
  it('should return correct calculation result about diff on number-of-days', function(){
    sampleObj[0].difference.should.equal(40541);
  });

  it('should organise the earlierdate and laterdate to respective fields correctly', function(){
    JSON.stringify(sampleObj[0].earlierdate).should.equal(JSON.stringify(testDate));
    JSON.stringify(sampleObj[0].laterdate).should.equal(JSON.stringify(testDate1));
  });
});


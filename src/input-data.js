export let inputData = [

  // valid input, but earlier date comes 2nd
  {
    inputDatePair:['01 01 1901','01 01 1900',]
  },

  // valid input 1
  {
    inputDatePair:['01 01 1900','01 01 1901']
  },

  // valid input, testing if Difference's unit become 'day' rather than 'days'
  {
    inputDatePair:['01 01 1900','02 01 1900']
  },

  // valid input 2
  {
    inputDatePair:['01 01 1900','31 12 2010']
  },

  // missing valid key to dict
  {
    invalidkey:['01 01 1900','01 01 1901']
  },

    // missing one date
  {
    inputDatePair:['01 01 1900']
  },

  // missing both dates
  {
    inputDatePair:[]
  },

  // date string length is invalid
  {
    inputDatePair:['01 011900','31 12 2010']
  },

  // invalid day
  {
    inputDatePair:['45 12 1900','31 01 1901']
  },
  // invalid month
  {
    inputDatePair:['12 45 1900','31 01 1901']
  },
  // invalid year > 2010
  {
    inputDatePair:['12 12 1900','31 01 2017']
  },
  // invalid year < 1900
  {
    inputDatePair:['12 12 1895','31 01 1901']
  },

  // incorrect 31 days in certain months
  {
    inputDatePair:['12 12 1900','31 04 2007']
  },

  // incorrect 29 days in Feb of common years
  {
    inputDatePair:['12 12 1900','29 02 2007']
  },

]
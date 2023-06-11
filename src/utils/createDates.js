// function getDays(startDate, stopDate) {
//   Date.prototype.addDays = function (days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
//   };

//   function getDates() {
//     var dateArray = new Array();
//     var currentDate = startDate;
//     while (currentDate <= stopDate) {
//       dateArray.push(new Date(currentDate));
//       currentDate = currentDate.addDays(1);
//     }
//     return dateArray;
//   }
//   const arr =  getDates()
//   return arr  
// }

// export default getDays;

function getAllDatesInYear(year) {
  var dates = [];
  var date = new Date(year, 0, 1); // January 1st of the specified year

  while (date.getFullYear() === year) {
    dates.push(new Date(date)); // Store a new instance of the date object in the array
    date.setDate(date.getDate() + 1); // Move to the next day
  }

  return dates;
}

function getAllDatesInYearByMonth(year) {
  var datesByMonth = {};
  var date = new Date(year, 0, 1); // January 1st of the specified year

  while (date.getFullYear() === year) {
    var month = date.getMonth(); // Get the month index (0-11)
    if (!datesByMonth.hasOwnProperty(month)) {
      datesByMonth[month] = []; // Initialize an array for the month if it doesn't exist
    }
    datesByMonth[month].push(new Date(date)); // Add the date to the corresponding month
    date.setDate(date.getDate() + 1); // Move to the next day
  }

  return datesByMonth;
}


export default getAllDatesInYearByMonth
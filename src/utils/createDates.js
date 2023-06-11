function getAllDatesInYearByMonth(year) {
  const datesByMonth = {};
  const date = new Date(year, 0, 1); // January 1st of the specified year

  while (date.getFullYear() === year) {
    let month = date.getMonth(); // Get the month index (0-11)
    if (!datesByMonth.hasOwnProperty(month)) {
      datesByMonth[month] = []; // Initialize an array for the month if it doesn't exist
    }
    datesByMonth[month].push(new Date(date)); // Add the date to the corresponding month
    date.setDate(date.getDate() + 1); // Move to the next day
  }

  return datesByMonth;
}


export default getAllDatesInYearByMonth
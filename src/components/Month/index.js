import { useEffect, useState } from 'react';
import DateComponent from '../DateComponent';
import daysOfWeek from '../../constants/daysOfWeek';

import './style.scss';

export default function Month({ month, activeToolTip, handleToolTip, MonthRef }) {
  const [prevDates, setPrevDates] = useState([]);
  const [nextDates, setNextDates] = useState([]);
  const [noOfRows, setNoOfRows] = useState(0);

  const currentMonth = month[0].getMonth();

  // Get previous months date to fill first week 
  const getPrevDates = firstDate => {
    let firstDay = new Date(firstDate);
    let prevArr = [];
    while (firstDay.getDay() > 0) {
      let currentPrev = new Date(firstDay);
      currentPrev.setDate(firstDay.getDate() - 1);
      firstDay = currentPrev;
      prevArr.push(firstDay);
    }
    prevArr.reverse();
    setPrevDates([...prevArr]);
  };

  // Get next months date to fill last week 
  const getNextDates = firstDate => {
    let firstDay = new Date(firstDate);
    let nextArr = [];
    while (firstDay.getDay() < 6) {
      let currentPrev = new Date(firstDay);
      currentPrev.setDate(firstDay.getDate() + 1);
      firstDay = currentPrev;
      nextArr.push(firstDay);
    }
    setNextDates([...nextArr]);
  };

  useEffect(() => {
    getPrevDates(month[0]);
    getNextDates(month[month.length - 1]);
  }, [month]);

  // Set no of weeks to pass to css grid
  useEffect(() => {
    setNoOfRows((month.length + nextDates.length + prevDates.length) / 7)
  }, [month, nextDates, prevDates])
 
  return (
    <div className='month-dates' ref={MonthRef}>
      <ul className='week-days'>
        {daysOfWeek.map(day => (
          <li key={day}>
            <span>{day}</span>
          </li>
        ))}
      </ul>
      <ul className={`month ${noOfRows > 5 ? 'extra-row' : ''}`}>
        {prevDates.map((date) => {
          return (
            <DateComponent key={date} date={date} currentMonth={currentMonth} />
          );
        })}
        {month.map((date) => {
          return (
            <DateComponent
              key={date}
              date={date}
              currentMonth={currentMonth}
              activeToolTip={activeToolTip}
              handleToolTip={handleToolTip}
            />
          );
        })}
        {nextDates.map((date) => {
          return (
            <DateComponent key={date} date={date} currentMonth={currentMonth} />
          );
        })}
      </ul>
    </div>
  );
}

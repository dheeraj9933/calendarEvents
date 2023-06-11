import { useEffect, useState } from 'react';
import DateComponent from '../DateComponent';

import './style.scss';

export default function Month({ month }) {
  const [prevDates, setPrevDates] = useState([]);
  const [nextDates, setNextDates] = useState([]);
  const [activeToolTip, setActiveTooltip] = useState({
    date: null,
    events: [],
  });
  const currentMonth = month[0].getMonth();

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const getPrevDates = firstDate => {
    // let firstDay = firstDate;
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
  const getNextDates = firstDate => {
    // let firstDay = firstDate;
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
  const handleToolTip = value => {
    if (value.hasOwnProperty('date') && value.date !== activeToolTip.date) {
      setActiveTooltip({ ...value });
    } else {
      setActiveTooltip({ date: null, events: [] });
    }
  };

  return (
    <div className='month-dates'>
      <ul className='week-days'>
        {daysOfWeek.map(day => (
          <li key={day}>
            <span>{day}</span>
          </li>
        ))}
      </ul>
      <ul className='month'>
        {prevDates.map((date, key) => {
          return (
            <DateComponent key={date} date={date} currentMonth={currentMonth} />
          );
        })}
        {month.map((date, key) => {
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
        {nextDates.map((date, key) => {
          return (
            <DateComponent key={date} date={date} currentMonth={currentMonth} />
          );
        })}
      </ul>
    </div>
  );
}

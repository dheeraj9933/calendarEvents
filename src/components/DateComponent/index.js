import { useEffect, useState } from 'react';
import EventData from '../../constants/event-data.json';
import PropTypes from 'prop-types';

import './style.scss';
import Tooltip from './components/ToolTip';

export default function DateComponent({
  date,
  currentMonth,
  activeToolTip = null,
  handleToolTip = {},
}) {
  const [events, setEvents] = useState([]);
  const [hasEvents, setHasEvents] = useState(false);
  const [isHoliday, setIsHoliday] = useState(false);
  const isTodaysDate =
    new Date().toDateString() === new Date(date).toDateString();
  const isCurrentMonthDate = date.getMonth() === currentMonth;
  const isMobile = window.innerWidth < 768;
  // format event date
  useEffect(() => {
    if (date.getMonth() === currentMonth) {
      EventData.forEach(item => {
        if (
          new Date(item.date).toDateString() === new Date(date).toDateString()
        ) {
          setEvents(item.events);
          setHasEvents(true);
          if (item.events[0].type === 'holiday') {
            setIsHoliday(true);
          }
        }
      });
    }
  }, [currentMonth, date]);

  return (
    <li
      // ref={triggerElement}
      className={`date ${isTodaysDate ? 'today-date' : ''} ${
        !isCurrentMonthDate ? 'inactive-date' : ''
      } ${hasEvents && isCurrentMonthDate ? 'events' : ''} ${
        isHoliday ? 'holiday' : ''
      } ${activeToolTip?.date === date ? 'active-tooltip' : ''} `}
      onClick={() => handleToolTip({ date, events })}
    >
      <span className='date-number'>{new Date(date).getDate()}</span>
      {!isMobile && (
        <>
          {events.length > 0 && (
            <span className='event-title'>{events[0].title}</span>
          )}
          {events.length > 1 && (
            <span className='more-event'>+{events.length - 1} more</span>
          )}
        </>
      )}
      <Tooltip
        activeToolTip={activeToolTip}
        date={date}
        events={events}
      />
    </li>
  );
}

DateComponent.defaultProps = {
  activeToolTip: null,
  handleToolTip: () => {},
};

DateComponent.propTypes = {
  date: PropTypes.object.isRequired,
  currentMonth: PropTypes.number.isRequired,
  activeToolTip: PropTypes.object,
  handleToolTip: PropTypes.func,
};

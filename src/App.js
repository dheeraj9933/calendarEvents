import { useState, createContext, useEffect, useRef } from 'react';
import './App.scss';
import Month from './components/Month';
import getDates from './utils/createDates';
import CalenderImg from './assets/calendar.svg';
import AddEvent from './assets/add-event.svg';

import AddNewEvent from './components/AddNewEvent';
import Modal from './components/Modal';

export const AddEventModal = createContext();

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Set Default month to current month
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [defaultDate, setDefaultDate] = useState(null);
  const MonthRef = useRef(null)
  const dates = getDates(2023);
  const [activeToolTip, setActiveTooltip] = useState({
    date: null,
    events: [],
  });

  const monthfirstDate = new Date(dates[currentMonth][0]);
  const monthName = monthfirstDate.toLocaleString('default', { month: 'long' });
  const year = monthfirstDate.getFullYear();
  const closeModal = () => {
    setShowAddEvent(false);
    setDefaultDate(null);
  };
  
  // Month Navigation
  const goToNextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth(currentMonth + 1);
    }
  };
  const goToPrevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
    }
  };
  // Hide overflow when modal is open
  useEffect(() => {
    if (showAddEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showAddEvent]);

  const hideToolTip = e => {
    if(!MonthRef.current.contains(e.target)) {
      setActiveTooltip({ date: null, events: [] });
    }
  };
  
  const handleToolTip = value => {
    if (
      value.hasOwnProperty('date') &&
      value?.date?.toString() !== activeToolTip?.date?.toString()
    ) {
      setActiveTooltip({ ...value });
    } else {
      setActiveTooltip({ date: null, events: [] });
    }
  };

  return (
    <div className='App' onClick={hideToolTip}>
      <div className='header'>
        <h1>
          <img src={CalenderImg} alt='' /> Key Dates
        </h1>
        <button onClick={() => setShowAddEvent(true)}>
          <img src={AddEvent} alt='' />
          Add Event
        </button>
      </div>
      <div className='calender-container'>
        <div>
          <h2 className='month-name'>
            {monthName}, {year}
          </h2>
          <div className='month-navigation'>
            <button onClick={goToPrevMonth}>
              <i className='fa-solid fa-chevron-left'></i>
            </button>
            <button onClick={goToNextMonth}>
              <i className='fa-solid fa-chevron-right'></i>
            </button>
          </div>
        </div>
        <AddEventModal.Provider
          value={{
            setShowAddEvent,
            setDefaultDate,
          }}
        >
          <Month
            month={dates[currentMonth]}
            activeToolTip={activeToolTip}
            handleToolTip={handleToolTip}
            MonthRef={MonthRef}
          />
        </AddEventModal.Provider>
      </div>
      <Modal customClose={closeModal} show={showAddEvent}>
        {showAddEvent && (
          <AddNewEvent customClose={closeModal} defaultDate={defaultDate} />
        )}
      </Modal>
    </div>
  );
}

export default App;

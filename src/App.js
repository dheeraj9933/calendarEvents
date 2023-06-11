import { useState, createContext, useEffect } from 'react';
import './App.scss';
import Month from './components/Month';
import getDates from './utils/createDates';
import CalenderImg from './assets/calendar.svg';
import AddEvent from './assets/add-event.svg';

import AddNewEvent from './components/AddNewEvent';
import Modal from './components/Modal';

export const AddEventModal = createContext();

function App() {
  const [currentMonth, setCurrentMonth] = useState(0);

  const [showAddEvent, setShowAddEvent] = useState(false);
  const dates = getDates(2023);
  // console.log(dates);
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
  const monthfirstDate = new Date(dates[currentMonth][0]);
  const monthName = monthfirstDate.toLocaleString('default', { month: 'long' });
  const year = monthfirstDate.getFullYear();
  const closeModal = () => {
    setShowAddEvent(false);
  };
  useEffect(() => {
    if (showAddEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showAddEvent]);
  return (
    <div className='App'>
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
          }}
        >
          <Month month={dates[currentMonth]} />
        </AddEventModal.Provider>
      </div>
      {showAddEvent && (
        <Modal customClose={closeModal}>
          <AddNewEvent customClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;

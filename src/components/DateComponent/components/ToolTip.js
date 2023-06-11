import { useEffect, useRef, useContext } from 'react';


import { AddEventModal } from '../../../App';

export default function Tooltip({
  activeToolTip,
  date,
  events,
}) {
  const { setShowAddEvent, setDefaultDate } = useContext(AddEventModal);
  const absoluteDiv = useRef(null);
  const tooltipArrow = useRef(null);
  const viewportWidth = window.innerWidth;
  const isMobile = viewportWidth < 768

  // make sure tooltip is fully visible
  useEffect(() => {
    if (activeToolTip?.date?.toString() === date.toString()) {
     
      const viewportHeight = window.innerHeight;
      // Get the dimensions of the trigger element and absolute div
      // const triggerRect = triggerElement.current.getBoundingClientRect();
      const divRect = absoluteDiv.current.getBoundingClientRect();
      if (divRect.left < 0) {
        const left = 0;
        absoluteDiv.current.style.left = `${left + 20}px`;
      } else {
        absoluteDiv.current.style.right = '20px';
      }

      // adjust for height
      if (divRect.top + divRect.height > viewportHeight) {
        absoluteDiv.current.style.top = 'auto';
        absoluteDiv.current.style.bottom = '100%';
        tooltipArrow.current.classList = 'arrow-down';
        if (divRect.left < 0) {
          tooltipArrow.current.classList = 'arrow-down arrow-up-left';
        } else {
          tooltipArrow.current.classList = 'arrow-down arrow-up-right';
        }
      } else {
        if (divRect.left < 0) {
          tooltipArrow.current.classList = 'arrow-up arrow-up-left';
        } else {
          tooltipArrow.current.classList = 'arrow-up arrow-up-right';
        }
      }

      if(isMobile) {
        absoluteDiv.current.style.position = 'fixed';
        absoluteDiv.current.style.width = '92%';
        absoluteDiv.current.style.left = '4%';
        absoluteDiv.current.style.top = '10px';
        absoluteDiv.current.style.bottom = 'auto';
        tooltipArrow.current.classList = '';
      }

    }
    return () => {
      if (absoluteDiv.current) {
        absoluteDiv.current.style.right = '20px';
        absoluteDiv.current.style.left = 'auto';
        absoluteDiv.current.style.top = '100%';
        absoluteDiv.current.style.bottom = 'auto';
        // eslint-disable-next-line 
        absoluteDiv.current.style.position = 'absolute';
      }
    };
  }, [activeToolTip, date , isMobile]);

  return (
    <div
      className={`tooltip ${activeToolTip?.date?.toString() === date?.toString() ? 'show' : ''}`}
      ref={absoluteDiv}
    >
      <div ref={tooltipArrow} className='arrow-up'></div>
      {Array.isArray(events) && events.length ? (
        <>
          <span className='tooltip-title'>{events.length + 1} events</span>
          <ul className='tooltip-list custom-scrollbar-black'>
            {events.map(event => {
              return (
                <li key={event.title}>
                  <h4 className='text-overflow'>{event.title}</h4>
                  <p className='text-overflow'>{event.description}</p>
                  {Array.isArray(event.tags) && event.tags.length > 0 && (
                    <ul className='tooltip-tags'>
                      {event.tags.map(tag => (
                        <li key={`tooltip-${tag}`} className='tooltip-tag'>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className='no-events'>No Events Present</div>
      )}
      <button className='add-event' onClick={() => { setShowAddEvent(true); setDefaultDate(date) }}>
        <i className='fa-solid fa-plus'></i> Add Event
      </button>
    </div>
  );
}

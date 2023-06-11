import { useRef } from 'react';

import './style.scss'

export default function AddNewEvent({ customClose, show, children }) {
  const modalRef = useRef(null);
  const handleModalClick = e => {
    e.stopPropagation();
    if (!modalRef.current.contains(e.target)) {
      customClose();
    }
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={e => handleModalClick(e)}>
      <div className='modal-content' ref={modalRef}>
        {children}
      </div>
    </div>
  );
}

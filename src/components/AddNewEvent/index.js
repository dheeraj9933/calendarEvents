import { useState, useEffect, useRef } from 'react';
import AddSvg from '../../assets/add-event-form.svg';
import './style.scss';
import AllTags from '../../constants/tags.json';

import TagList from './components/TagList';
import formatDate from '../../utils/formatDate';
export default function AddNewEvent({ customClose, defaultDate }) {
  const [showTags, setShowTags] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [tags, setTags] = useState({});
  const [eventTitle, setEventTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const date = useRef();
  const TagListRef = useRef();

  const handleTagChange = value => {
    const updatesTags = { ...tags };
    updatesTags[value] = !tags[value];
    setTags(updatesTags);
  };

  // check if is valid
  useEffect(() => {
    if (eventTitle && description && eventDate) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [eventTitle, description, eventDate]);

  const openCalendar = () => {
    date.current.showPicker();
  };

  // Create object with all the tags
  useEffect(() => {
    const tagsObj = {};
    AllTags.forEach(tag => {
      tagsObj[tag] = false;
    });
    setTags(tagsObj);
  }, []);

  useEffect(() => {
    if (defaultDate) {
      setEventDate(formatDate(defaultDate));
    } else {
      setEventDate('');
    }
  }, [defaultDate]);

  const closeTagList = e => {
    if (TagListRef?.current && !TagListRef?.current?.contains(e.target)) {
      setShowTags(false);
    }
  };

  return (
    <div className='add-new-event-container' onClick={closeTagList}>
      <div className='title'>
        <img src={AddSvg} alt='Add Event' />
        <div className='title-text'>
          <input
            type='text'
            placeholder='Enter name of the event'
            value={eventTitle}
            onChange={e => setEventTitle(e.target.value)}
          />
          <span className='small'>Required</span>
          <span className='astereisk'>*</span>
        </div>
      </div>
      <form action='' onSubmit={e => e.preventDefault()}>
        <div className='form-inputs'>
          <div className='form-element date-input-container'>
            <label htmlFor=''>
              Event Date <span className='astereisk'>*</span>
            </label>
            <div className='date-input'>
              <input
                ref={date}
                type='date'
                name=''
                id=''
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}
                className={`${eventDate ? '' : 'hide'}`}
              />
              {eventDate ? (
                <button className='clear-date' onClick={() => setEventDate('')} title='Clear Date'>
                  <i className='fa-solid fa-xmark'></i>
                </button>
              ) : (
                <span className='choose-date' onClick={openCalendar} title='Add Date'>
                  <i className='fa-regular fa-calendar'></i>
                </span>
              )}
            </div>
          </div>
          <div className='form-element text-box-container'>
            <label htmlFor=''>
              Event Description <span className='astereisk'>*</span>
            </label>
            <textarea
              name=''
              id=''
              cols='30'
              rows='10'
              value={description}
              onChange={e => setDescription(e.target.value)}
              className='custom-scrollbar'
            ></textarea>
          </div>
          <div className='form-element text-box-container'>
            <span className='add-tags-label'>
              <label htmlFor=''>Tags</label>
              <button onClick={() => setShowTags(!showTags)} title='Add Tags'>
                Add Tags{' '}
                <i
                  className={`fa-solid fa-sort-down ${
                    showTags ? 'inverted' : ''
                  }`}
                ></i>
              </button>
              {showTags && (
                <div ref={TagListRef} className='tag-list'>
                  <TagList tags={tags} handleTagChange={handleTagChange} />
                </div>
              )}
            </span>
            <div className='active-tags'>
              {Object.keys(tags).map(tag => {
                if (tags[tag]) {
                  return (
                    <span key={tag} className='selected-tag'>
                      {tag}{' '}
                      <i
                        className='fa-sharp fa-solid fa-xmark'
                        onClick={() => handleTagChange(tag)}
                        title='Remove Tag'
                      ></i>
                    </span>
                  );
                } else return null;
              })}
            </div>
          </div>
        </div>
        <div className='btn-container'>
          <button className={`primary ${!isValid ? 'disabled' : ''}`} title='Create Event'>
            Create Event
          </button>
          <button className='secondary' onClick={customClose} title='Discard'>
            Discard
          </button>
        </div>
      </form>
    </div>
  );
}

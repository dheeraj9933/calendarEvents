import { useState, useEffect } from 'react';
import AddSvg from '../../assets/add-event-form.svg';
import './style.scss';
import AllTags from '../../constants/tags.json';

import 'react-datepicker/dist/react-datepicker.css';
import TagList from './components/TagList';
export default function AddNewEvent({ customClose }) {
  const [showTags, setShowTags] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [tags, setTags] = useState({});
  const [eventTitle, setEventTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState(null);

  const handleTagChange = value => {
    const updatesTags = { ...tags };
    updatesTags[value] = !tags[value];
    setTags(updatesTags);
  };
  //   check if is valid
  useEffect(() => {
    if (eventTitle && description && eventDate) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [eventTitle, description, eventDate]);
  //   Create object with all the tags
  useEffect(() => {
    const tagsObj = {};
    AllTags.forEach(tag => {
      tagsObj[tag] = false;
    });
    setTags(tagsObj);
  }, []);
  return (
    <div className='add-new-event-container'>
      <div className='title'>
        <img src={AddSvg} alt='' />
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
            <input
              type='date'
              name=''
              id=''
              value={eventDate}
              onChange={e => setEventDate(e.target.value)}
            />
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
              <button onClick={() => setShowTags(!showTags)}>
                Add Tags <i className={`fa-solid fa-sort-down ${showTags ? 'inverted' : ''}`}></i>
              </button>
              {showTags && (
                <TagList tags={tags} handleTagChange={handleTagChange} />
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
                } else return null
              })}
            </div>
          </div>
        </div>
        <div className='btn-container'>
          <button className={`primary ${!isValid ? 'disabled' : ''}`}>
            Create Event
          </button>
          <button className='secondary' onClick={customClose}>
            Discard
          </button>
        </div>
      </form>
    </div>
  );
}

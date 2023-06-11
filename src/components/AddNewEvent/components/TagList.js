import { useEffect, useState } from 'react';

export default function TagList({ tags, handleTagChange }) {
  const [filteredTags, setFilteredTags] = useState(tags);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const result = {};
    Object.keys(tags).forEach(tag => {
      if (tag.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
        result[tag] = tags[tag];
      }
    });
    setFilteredTags(result);
  }, [search, tags]);
  return (
    <div className='tag-list'>
      <div className='search-box'>
        <i className='fa-solid fa-magnifying-glass'></i>
        <input
          type='text'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search Tags'
        />
      </div>
      <ul className='tag-select-list custom-scrollbar'>
        {Object.keys(filteredTags).map(tag => {
          return (
            <li key={`li${tag}`}>
              <input
                type='checkbox'
                id={tag}
                name={tag}
                value={tag}
                onChange={e => handleTagChange(e.target.value)}
                checked={tags[tag]}
              />
              <label htmlFor={tag}> {tag}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import React from 'react';
import Categories from './Categories';
import AudioBook from './AudioBook';
import AudioBookSection from './AudioBookSection';

// import useInitialState from '../hooks/useInitialStates';

const AudioBookList = () => {
  return (
    <div>
      <Categories title='Mi lista'>
        <AudioBookSection>
          <AudioBook />
          <AudioBook />
          <AudioBook />
          <AudioBook />
          <AudioBook />
          <AudioBook />
          <AudioBook />
          <AudioBook />
          <AudioBook />
        </AudioBookSection>
      </Categories>
    </div>
  );
};

export default AudioBookList;


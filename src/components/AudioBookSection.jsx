import React from 'react';
import '../assets/styles/components/AudioBookSection.scss';

const AudioBookSection = ({ children }) => (
  <section className='book'>
    <div className='book__container'>
      {children}
    </div>
  </section>
);

export default AudioBookSection;

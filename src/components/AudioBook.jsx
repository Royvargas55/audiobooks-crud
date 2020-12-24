import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/components/AudioBook.scss';

import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';

const AudioBook = ({ cover, title, year, contentRating, duration }) => (
  <div className='book-item'>
    <img className='book-item__img' src={cover} alt={title} />
    <div className='book-item__details'>
      <div>
        <img className='book-item__details--img' src={playIcon} alt='Play Icon' />
        <img className='book-item__details--img' src={plusIcon} alt='Plus Icon' />
      </div>
      <p className='book-item__details--title'>{title}</p>
      <p className='book-item__details--subtitle'>
        {`${year} ${contentRating} ${duration} minutos`}
      </p>
    </div>
  </div>
);

AudioBook.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number };

export default AudioBook;

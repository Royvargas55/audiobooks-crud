/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../assets/styles/components/AudioBook.scss';

import editIcon from '../assets/static/edit-icon.png';
import deleteIcon from '../assets/static/delete-icon.png';

const AudioBook = ({ id, title, streetDate, costPerPlay, authors, narrators, duration, cover, requestDelete }) => (
  <div className='book-item'>
    <img className='book-item__img' src={cover} alt={title} />
    <div className='book-item__details'>
      <div>
        <Link to={`edit/${id}`}><img className='book-item__edit--img' src={editIcon} alt='Play Icon' /></Link>
        {requestDelete && (
          <button onClick={requestDelete} type='button' className='delete__btn'><img className='book-item__delete--img' src={deleteIcon} alt='Plus Icon' /></button>
        )}
      </div>
      <Link to={`/${id}`} className='description__link'>
        <p className='book-item__details--title'>{title}</p>
        <p className='book-item__details--subtitle'>
          {`Street date: ${streetDate}`}
          <br />
          {`Duration: ${duration}`}
          <br />
          {`Cost per play: $${costPerPlay}`}
          <br />
          {`Authors: ${authors}`}
          <br />
          {`Narrators: ${narrators}`}
        </p>
      </Link>
    </div>
  </div>
);

AudioBook.propTypes = {
  title: PropTypes.string,
  streetDate: PropTypes.string,
  costPerPlay: PropTypes.number,
  authors: PropTypes.array,
  narrators: PropTypes.array,
  duration: PropTypes.string,
  cover: PropTypes.string };

export default AudioBook;

/* eslint-disable radix */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-sequences */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

import Header from './Header';
import Footer from './Footer';

import infoIcon from '../assets/static/info-icon.png';
import '../assets/styles/components/EditAudioBook.scss';

const accessToken = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';

class EditAudioBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      form: {
        title: '',
        streetDate: '',
        costPerPlay: '',
        author: '',
        authors: [],
        narrator: '',
        narrators: [],
        duration: '',
      },
    };
  }

  showInfo= () => {
    swal({
      title: 'Important!',
      text: 'You need to add all the values again, no empty space can be left in the form.',
      icon: 'info',
      button: 'Accept',
      timer: 6000,
    });
  }

  handleChange=async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  }

  addAuthor = () => {
    this.setState((state) => {
      const list = state.form.authors.push(state.form.author);
      state.form.author = '';
      swal({
        title: 'Successfully completed',
        text: 'Added author',
        icon: 'success',
        button: 'Accept',
        timer: 2000,
      });
      return {
        list,
        author: '',
      };
    });
  };

  addNarrator = () => {
    this.setState((state) => {
      const list = state.form.narrators.push(state.form.narrator);
      state.form.narrator = '';
      swal({
        title: 'Successfully completed',
        text: 'Added narrator',
        icon: 'success',
        button: 'Accept',
        timer: 2000,
      });
      return {
        list,
        narrator: '',
      };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const apiUrl = `https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries/${this.state.id}`;
    axios.put(apiUrl, {
      'fields': {
        'title': {
          'es-MX': this.state.form.title,
        },
        'is_original': {
          'es-MX': false,
        },
        'street_date': {
          'es-MX': this.state.form.streetDate,
        },
        'cost_per_play': {
          'es-MX': parseInt(this.state.form.costPerPlay),
        },
        'authors': {
          'es-MX': this.state.form.authors,
        },
        'narrators': {
          'es-MX': this.state.form.narrators,
        },
        'duration': {
          'es-MX': parseInt(this.state.form.duration),
        },
        'cover': {
          'es-MX': 'http://dummyimage.com/800x600.png/FF7A90/ffffff',
        },
      },
    },
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Contentful-Content-Type': 'audiocontent-v1',
        'X-Contentful-Version': 1,
      },
    })
      .then((res) => {
        console.log(res);
        this.setState((state) => {
          state.form.title = '';
          state.form.streetDate = '';
          state.form.costPerPlay = '';
          state.form.duration = '';
          swal({
            title: 'Successfully completed',
            text: 'Audiobook edited correctly',
            icon: 'success',
            button: 'Accept',
            timer: 4000,
          });
          return {
            title: '',
            streetDate: '',
            costPerPlay: '',
            duration: '',
          };
        });
      })
      .catch((error) => {
        console.error(error);
        swal({
          title: 'Something wrong',
          text: 'Check the values again',
          icon: 'error',
          button: 'Accept',
          timer: 4000,
        });
      });
  };

  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <div className='audio__book'>
            <div className='header__form'>
              <h1 className='title'>Edit audiobook</h1>
              <button onClick={this.showInfo} type='button' className='info__btn'><img className='book-item__info--img' src={infoIcon} alt='Info Icon' /></button>
            </div>

            <form onSubmit={this.submitHandler} className='form'>
              <div className='form__group'>
                <input
                  type='text'
                  name='title'
                  placeholder='Title'
                  className='form__input'
                  value={this.state.form.title}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form__group'>
                <input
                  type='date'
                  name='streetDate'
                  placeholder='Street date'
                  className='form__input'
                  value={this.state.form.streetDate}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form__group'>
                <input
                  type='text'
                  name='costPerPlay'
                  placeholder='Cost per play (in dollars)'
                  className='form__input'
                  value={this.state.form.costPerPlay}
                  onChange={this.handleChange}
                />
              </div>

              <div className='form__group'>
                <input
                  type='text'
                  name='author'
                  placeholder='Authors'
                  className='form__input'
                  value={this.state.form.author}
                  onChange={this.handleChange}
                />
                <button className='btn__add' type='button' onClick={this.addAuthor}>
                  Add author
                </button>
              </div>

              <div className='form__group'>
                <input
                  type='text'
                  name='narrator'
                  placeholder='Narrators'
                  className='form__input'
                  value={this.state.form.narrator}
                  onChange={this.handleChange}
                />
                <button className='btn__add' type='button' onClick={this.addNarrator}>
                  Add narrator
                </button>
              </div>

              <div className='form__group'>
                <input
                  type='text'
                  name='duration'
                  placeholder='Duration (in seconds)'
                  className='form__input'
                  value={this.state.form.duration}
                  onChange={this.handleChange}
                />
              </div>

              <div className='btn__group'>
                <button className='btn' type='submit'>Edit audiobook</button>
                <Link to='/' className='btn__cancel'>Cancel</Link>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default EditAudioBook;

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

import '../assets/styles/components/EditAudioBook.scss';

const accessToken = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';

class EditAudioBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      data: [],
      form: {
        title: '',
        streetDate: '',
        costPerPlay: 0,
        author: '',
        authors: [],
        narrator: '',
        narrators: [],
        duration: 0,
      },
    };
  }

  timeConvert = (n) => {
    n = Number(n);
    const h = Math.floor(n / 3600);
    const m = Math.floor(n % 3600 / 60);
    const s = Math.floor(n % 3600 % 60);

    const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
    const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
  }

  //Get single Audiobook
  requestGet = () => {
    const apiGetUrl = `https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?sys.id=${this.state.id}&select=fields,sys.id,sys.version&locale=es-MX`;
    axios.get(apiGetUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        this.setState({ data: res.data.items });
        console.log(this.state.data[0].fields);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.requestGet();
  }

  handleChange=async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.from,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  }

  submitHandler = (e) => {
    e.preventDefault();
    axios.post('', {
      'fields': {
        'title': {
          'es-MX': '',
        },
        'is_original': {
          'es-MX': false,
        },
        'street_date': {
          'es-MX': '',
        },
        'cost_per_play': {
          'es-MX': '',
        },
        'authors': {
          'es-MX': '',
        },
        'narrators': {
          'es-MX': '',
        },
        'duration': {
          'es-MX': '',
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
            <h1 className='title'>Edit audiobook</h1>
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

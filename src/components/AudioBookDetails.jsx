/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

import Header from './Header';
import Footer from './Footer';

import '../assets/styles/components/AudioBookDetails.scss';

const accessToken = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';

class AudioBookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      data: [],
      redirect: false,
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
        console.log(this.state.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  requestDelete = () => {
    const apirUrlDelete = `https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries/${this.state.id}`;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(apirUrlDelete, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        })
          .then((res) => {
            this.setState({ redirect: true });
          })
          .catch((error) => {
            console.error(error);
            swal({
              title: 'Something wrong',
              text: 'Try again!',
              icon: 'error',
              button: 'Accept',
              timer: 4000,
            });
          });
      }
    });
  }

  componentDidMount() {
    this.requestGet();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/home' />;
    }
    return (
      <div>
        <Header />
        {this.state.data.map((item) => (
          <div key={item.sys['id']} className='wrapper'>
            <div className='card'>
              <div className='audiobook__left'>
                <div className='header'>
                  <h1 className='title'>{item.fields.title['es-MX']}</h1>
                </div>

                <div className='audiobook__main'>
                  <span>Description</span>
                  <p>
                    Street date:
                    {' '}
                    {item.fields.street_date['es-MX']}
                  </p>
                  <p>
                    Cost per play:
                    {' '}
                    {item.fields.cost_per_play['es-MX']}
                  </p>
                  <p>
                    Author(s):
                    {' '}
                    {item.fields.authors['es-MX']}
                  </p>
                  <p>
                    Narrator(s):
                    {' '}
                    {item.fields.narrators['es-MX']}
                  </p>
                </div>

                <div className='audiobook__details'>

                  <div className='audiobook__total'>
                    <h3>Duration</h3>
                    <p>{this.timeConvert(item.fields.duration['es-MX'])}</p>
                  </div>
                </div>

                <div className='audiobook__btns'>
                  <Link to={`edit/${item.sys['id']}`} className='audio__book__edit'>Edit</Link>
                  <button onClick={this.requestDelete} className='audio__book__delete'>DELETE</button>
                </div>
              </div>
              <div className='product-right'>
                <img src={item.fields.cover['es-MX']} alt='' />
              </div>
            </div>
          </div>
        ))}
        <Footer />
      </div>
    );
  }
}

export default AudioBookDetails;

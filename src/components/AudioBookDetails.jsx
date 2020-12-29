/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  componentDidMount() {
    this.requestGet();
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.data.map((item) => (
          <div key={item.sys['id']} className='wrapper'>
            <div className='card'>
              <div className='product-left'>
                <div className='header'>
                  <h1 className='title'>{item.fields.title['es-MX']}</h1>
                </div>

                <div className='product-main'>
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

                <div className='product-details'>

                  <div className='product-total'>
                    <h3>Duration</h3>
                    <p>{this.timeConvert(item.fields.duration['es-MX'])}</p>
                  </div>
                </div>

                <div className='product-btns'>
                  <Link to={`edit/${item.sys['id']}`} className='audio__book__edit'>Edit</Link>
                  <a href='#' className='audio__book__delete'>Delete</a>
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

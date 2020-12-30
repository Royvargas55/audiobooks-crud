/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import Categories from './Categories';
import AudioBook from './AudioBook';
import AudioBookSection from './AudioBookSection';

const apiUrl = 'https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?select=fields,sys.id,sys.version&locale=es-MX';
const accessToken = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';

class AudioBookList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  //Set format of the duration
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

  //Get a list with the all audiobooks
  requestGet = () => {
    axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        this.setState({ data: res.data.items });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //Delete audiobook
  requestDelete = (id) => {
    const apirUrlDelete = `https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries/${id}`;
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
            this.requestGet();
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
    return (
      <div className='section__mylist'>
        <Categories title='My list'>
          <AudioBookSection>
            {this.state.data.map((item) => (
              <AudioBook
                key={item.sys['id']}
                id={item.sys['id']}
                title={item.fields.title['es-MX']}
                streetDate={item.fields.street_date['es-MX']}
                costPerPlay={item.fields.cost_per_play['es-MX']}
                authors={item.fields.authors['es-MX']}
                narrators={item.fields.narrators['es-MX']}
                duration={this.timeConvert(item.fields.duration['es-MX'])}
                cover={item.fields.cover['es-MX']}
                requestDelete={this.requestDelete.bind(this, item.sys['id'])}
              />
            ))}
          </AudioBookSection>
        </Categories>
      </div>
    );
  }
};

export default AudioBookList;


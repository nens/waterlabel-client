import React, { Component, PropTypes } from 'react';
import styles from './SearchWidget.css';
import $ from 'jquery';
import { Button } from 'react-bootstrap';

import {
  lookupPostcode,
} from '../actions.jsx';


class SearchWidget extends Component {

  constructor(props) {
    super(props);

    this._clearInput = this._clearInput.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleChangePostcode = this._handleChangePostcode.bind(this);
    this._handleChangeHousenumber = this._handleChangeHousenumber.bind(this);
    this._performSearch = this._performSearch.bind(this);

    this.state = {
      'postcode': 'Postcode',
      'housenumber': 'Nr',
    };
  }

  componentDidMount() {
    document.getElementById('postcode').focus();
  }

  _handleKeyPress(e) {
    const self = this;
    if (e.key === 'Enter') {
        let rege = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
        if(rege.test(self.state.postcode) &&
           Number.isInteger(Number(self.state.housenumber))) {
          this.props.dispatch(
            lookupPostcode(self.state.postcode, self.state.housenumber)
          );
        }
    }
  }

  _performSearch() {
    let self = this;
    let rege = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
    if(rege.test(self.state.postcode) &&
       Number.isInteger(Number(self.state.housenumber))) {
      this.props.dispatch(
        lookupPostcode(self.state.postcode, self.state.housenumber)
      );
    }
  }

  _clearInput(e) {
    if (e.target.value === 'Postcode') {
      this.setState({
        'postcode': '',
      });
    }
    if (e.target.value === 'Nr') {
      this.setState({
        'huisnummer': '',
      });
    }
  }

  _handleChangePostcode(e) {
    this.setState({
      'postcode': e.target.value,
    });
  }

  _handleChangeHousenumber(e) {
    this.setState({
      'housenumber': e.target.value,
    });
  }

  render() {
    return <div/>;
    return (
      <div className={styles.searchAndCheckWidget}>
        <form className='form-inline' style={{ padding: 7 }}>
          <Button
            bsStyle='info'
            tabIndex='3'
            style={{ float: 'right', marginLeft: 5 }}
            onClick={this._performSearch}>OK</Button>
          <input
            tabIndex='2'
            style={{ width: 80, marginLeft: 5, float: 'right' }}
            type='number'
            min='0'
            placeholder='Nr'
            className='form-control'
            onFocus={this._clearInput}
            onChange={this._handleChangeHousenumber}
            onKeyPress = {this._handleKeyPress}
            name='huisnummer'
            value={this.state.huisnummer} />
          <input
            tabIndex='1'
            id='postcode'
            type='text'
            name='postcode'
            placeholder='Postcode'
            className='form-control'
            style={{ width: 145 }}
            onFocus={this._clearInput}
            onChange={this._handleChangePostcode}
            onKeyPress = {this._handleKeyPress}
            value={this.state.postcode} />
        </form>
      </div>
    );
  }
}

export default SearchWidget;

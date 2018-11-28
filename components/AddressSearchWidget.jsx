import React, { Component, PropTypes } from 'react';
import styles from './App.css';
import { 
  Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well 
} from 'react-bootstrap';

const verifyPostcode = function (postcode) {

  const rege = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
  const noSpaces =  postcode.replace(/\s/g, '');
  
  return rege.test(noSpaces);
}




class AddressSearchWidget extends Component {

  handleKeyPress(e) {
    // if (e.key === ' ') {
    //   e.stopPropagation();
    //   e.preventDefault();
    //   return false;
    // }
    if (e.key === 'Enter') {
      // const postcodeFormatted = this.refs.postcode.value;
      // const huisnummerFormatted = this.refs.huisnummer.value;
  
      // const rege = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
      // if (postcodeFormatted.length === 6 &&
      //     this.refs.huisnummer.value &&
      //     rege.test(postcodeFormatted) &&
      //     huisnummerFormatted.toLowerCase()) {
      //   this.props.dispatch(
      //     lookupPostcode(postcodeFormatted, huisnummerFormatted)
      //   );
      // }
      this.props.dispatch(
        this.props.requestBuildings(
          this.props.addressSearchTerms.postcode, 
          this.props.addressSearchTerms.number)
      );
    }
  }

render(){
  const { 
    addressSearchTerms,
    addressSearchTermsPostcode,
    addressSearchResults, 
    // handleKeyPress, 
    setPostCode,
    setNumber,
    setStreet,
    setCity,
    requestBuildings,
    setSearchOnStreet,
    setSearchOnPostcode,
  } = this.props;
  return (
  <div>
    {/* <Row> */}
      {/* <Col md={6}> */}
        
          {
            addressSearchTerms.searchOn === 'POSTCODE'?
            <Row>
            <Col md={6} sm={12} xs={12}>
            <div className='form-group'>
              <label htmlFor='postcode'>Postcode</label>
              <input
                onChange={e=>setPostCode(e.target.value)}
                value={addressSearchTermsPostcode}
                ref='postcode'
                onKeyPress={e=>this.handleKeyPress(e)}
                id='postcode'
                type='text'
                maxLength='7'
                style={{ textTransform: 'uppercase' }}
                placeholder={'BIJV. 3731HS'}
                className={
                  'form-control input-lg '+ 
                  ((verifyPostcode(addressSearchTermsPostcode) || addressSearchTermsPostcode==='') ? "": styles.InvalidInput) 
                }
              />
            </div>
          </Col>
          </Row>
            :
            ""
          }

          <Row>
          <Col md={6} sm={12} xs={12}>
            <div className='form-group'>
              <label htmlFor='huisnummer'>Huisnummer</label>
              <input
                onChange={e=>{
                  if (e.target.value === '') {
                    setNumber(e.target.value)
                  }
                  else if (
                    parseInt(e.target.value, 10) !== NaN && 
                    parseInt(e.target.value, 10) >= 0
                  ) {
                    setNumber(parseInt(e.target.value, 10))
                  }
                }}
                value={addressSearchTerms.number}
                ref='huisnummer'
                onKeyPress={e=>this.handleKeyPress(e)}
                id='huisnummer'
                type='text'
                placeholder={'BIJV. 184'}
                className='form-control input-lg'
              />
            </div>
          {/* </Col> */}
          {/* <Col md={3} sd={3} xs={5}>
            <div className='form-group'>
              <label htmlFor='toevoeging'>Toevoeging</label>
              <input
                ref='toevoeging'
                onKeyPress={handleKeyPress}
                id='toevoeging'
                type='text'
                placeholder={'BIJV. A'}
                className='form-control input-lg'
              />
            </div>
          </Col> */}
        {/* </Row> */}
        {
          addressSearchTerms.searchOn === 'STREET'?
          <div>
            <Row>
              <Col md={12} sm={12} xs={12}>
                <div className='form-group'>
                  <label htmlFor='straatnaam'>Straatnaam</label>
                  <input
                    onChange={e=>setStreet(e.target.value)}
                    value={addressSearchTerms.street}
                    ref='straatnaam'
                    onKeyPress={e=>this.handleKeyPress(e)}
                    id='straatnaam'
                    type='text'
                    maxLength='6'
                    placeholder={'BIJV. Dorpstraat'}
                    className='form-control input-lg'
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12} sm={12} xs={12}>
                <div className='form-group'>
                  <label htmlFor='straatnaam'>Stad</label>
                  <input
                    onChange={e=>setCity(e.target.value)}
                    value={addressSearchTerms.city}
                    ref='stad'
                    onKeyPress={e=>this.handleKeyPress(e)}
                    id='stad'
                    type='text'
                    maxLength='6'
                    placeholder={'BIJV. Amsterdam'}
                    className='form-control input-lg'
                  />
                </div>
              </Col>
            </Row>
          </div>
          :
          ""
        }
       
      </Col>
    </Row>
    <Row>
      <Col md={6} sm={12} xs={12} >
        <div className='form-group'>
            <Button
              style={{ marginTop: 0, width: '100%' }}
              disabled={(addressSearchResults.isFetching) ? true : false}
              bsStyle='info'
              // onClick={this.handleSearchButton}
              onClick={e=>requestBuildings(addressSearchTerms.postcode, addressSearchTerms.number)}
              bsSize='lg'>
              <i className='fa fa-search' />&nbsp;
              {(addressSearchResults.isFetching) ? 'Even geduld a.u.b...' : 'Zoek'}
            </Button>
        </div>
      </Col>
    </Row>
    <Row>
      {
        addressSearchTerms.searchOn === 'POSTCODE'
        ?
          <Col md={12}>
            <a className={styles.InlineLink}
              onClick={setSearchOnStreet}>
              
              Zoek op straatnaam
            </a>
          </Col>
        :
        <Col md={12}>
            <a className={styles.InlineLink}
              onClick={setSearchOnPostcode}>
              
              Zoek op postcode
            </a>
          </Col>
      }
    </Row>
  </div>

  
)
}
}

AddressSearchWidget.propTypes = {}

export default AddressSearchWidget
import { ActionCreators } from 'redux-undo';
import { connect } from 'react-redux';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover } from 'react-bootstrap';
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet';
import $ from 'jquery';
import AboutText from './AboutText.jsx';
import algemeen02 from '../images/algemeen02.png';
import Calculator from './Calculator.jsx';
import calculatorStyles from './Calculator.css';
import GeoJsonUpdatable from '../lib/GeoJsonUpdatable.jsx';
import InteractiveCalculator from './InteractiveCalculator.jsx';
import logo from '../images/logowaterlabel.svg';
import moment from 'moment';
import queryString from 'query-string';
import React, { Component, PropTypes } from 'react';
import SelectedObjectDetails from './SelectedObjectDetails.jsx';
import selectedObjectStyles from './SelectedObjectDetails.css';
import styles from './App.css';
import WaterlabelMap from './WaterlabelMap.jsx';
require('!style!css!../node_modules/sweetalert/dist/sweetalert.css');

import {
  clearSelectedObject,
  fetchHistory,
  lookupPostcode,
  radiusSearch,
} from '../actions.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAboutText: false,
      showCalculator: false,
      showInteractiveCalculator: false,
      showIntro: false,
      showMap: false,
      showPrivacyText: false,
    };
    this.closeAboutText = this.closeAboutText.bind(this);
    this.closeCalculator = this.closeCalculator.bind(this);
    this.closeInteractiveCalculator = this.closeInteractiveCalculator.bind(this);
    this.closeIntro = this.closeIntro.bind(this);
    this.closeMap = this.closeMap.bind(this);
    this.closePrivacyText = this.closePrivacyText.bind(this);
    this.handleGeoLocation = this.handleGeoLocation.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.handleShowHistory = this.handleShowHistory.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.openAboutText = this.openAboutText.bind(this);
    this.openCalculator = this.openCalculator.bind(this);
    this.openInteractiveCalculator = this.openInteractiveCalculator.bind(this);
    this.openIntro = this.openIntro.bind(this);
    this.openMap = this.openMap.bind(this);
    this.openPrivacyText = this.openPrivacyText.bind(this);
    this.parseLocationString = this.parseLocationString.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('showIntro', true);
    document.getElementById('postcode').focus();
    window.addEventListener('load', this.parseLocationString);
    window.addEventListener('hashchange', this.parseLocationString);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillReceiveProps(props) {
    if (props.postcode.selectedObject) {
      $('html, body').animate({
        scrollTop: 500,
      }, 500);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.parseLocationString);
    window.removeEventListener('hashchange', this.parseLocationString);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  parseLocationString() {
    const parsed = queryString.parse(location.hash);
    const lat = (parsed.lat) ? parsed.lat : undefined;
    const lng = (parsed.lng) ? parsed.lng : undefined;
    const zoom = (parsed.zoom) ? parsed.zoom : undefined;
    const postcode = (parsed.postcode) ? parsed.postcode : undefined;
    const nr = (parsed.nr) ? parsed.nr : undefined;

    if (lat && lng && zoom && !postcode && !nr) {
      // this.props.dispatch(setMapLocation({
      //   lat:lat, lng: lng, zoom: zoom
      // }));
    }

    if (!lat && !lng && !zoom && postcode && nr) {
      this.props.dispatch(lookupPostcode(postcode, nr));
    }
  }


  handleKeyDown(e) {
    if (e.which === 90 && e.ctrlKey) {
      this.handleUndo();
    }
  }

  handleShowHistory() {
    this.props.dispatch(
      fetchHistory(
        this.props.postcode.selectedObject.properties.pk
      )
    );
  }


  openIntro() {
    this.setState({ showIntro: true });
  }

  closeIntro() {
    this.setState({ showIntro: false });
  }

  closeCalculator() {
    this.setState({ showCalculator: false });
  }

  closeInteractiveCalculator() {
    this.setState({ showInteractiveCalculator: false });
  }

  openCalculator() {
    this.setState({ showCalculator: true });
  }

  openInteractiveCalculator() {
    this.setState({ showInteractiveCalculator: true });
  }

  closeAboutText() {
    this.setState({ showAboutText: false });
  }

  openAboutText() {
    this.setState({ showAboutText: true });
  }

  closePrivacyText() {
    this.setState({ showPrivacyText: false });
  }

  openPrivacyText() {
    this.setState({ showPrivacyText: true });
  }

  closeMap() {
    this.setState({ showMap: false });
  }

  openMap() {
    this.setState({ showMap: true });
  }

  handleUndo() {
    this.props.dispatch(ActionCreators.undo());
  }

  handleSearchButton() {
    const postcodeFormatted = this.refs.postcode.value;
    const huisnummerFormatted = this.refs.huisnummer.value;
    const rege = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
    if (rege.test(postcodeFormatted) &&
        Number.isInteger(Number(huisnummerFormatted))) {
      this.props.dispatch(
        lookupPostcode(postcodeFormatted, huisnummerFormatted)
      );
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const postcodeFormatted = this.refs.postcode.value;
      const huisnummerFormatted = this.refs.huisnummer.value;

      const rege = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
      if (rege.test(postcodeFormatted) &&
          Number.isInteger(Number(huisnummerFormatted))) {
        this.props.dispatch(
          lookupPostcode(postcodeFormatted, huisnummerFormatted)
        );
      }
    }
  }

  historicalSvgStyle(label) {
    if (label === 'A') { return selectedObjectStyles.labelA; }
    if (label === 'B') { return selectedObjectStyles.labelB; }
    if (label === 'C') { return selectedObjectStyles.labelC; }
    if (label === 'D') { return selectedObjectStyles.labelD; }
    if (label === 'E') { return selectedObjectStyles.labelE; }
    if (label === 'F') { return selectedObjectStyles.labelF; }
    if (label === 'G') { return selectedObjectStyles.labelG; }
    return selectedObjectStyles.labelG;
  }

  handleGeoLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.dispatch(radiusSearch({
        'lng': position.coords.longitude,
        'lat': position.coords.latitude,
      }));
    }, (error) => {
      console.log(error);
    },
      {
        maximumAge: 1000,
        timeout: 5000,
        enableHighAccuracy: true,
      }
    );
  }

  render() {
    const { dispatch, postcode } = this.props;

    let geocoded;
    let adres;

    const selectedObject = (postcode &&
      postcode.selectedObject &&
      postcode.selectedObject.properties.pk) ?
      postcode.selectedObject.properties :
      undefined;

    if (selectedObject) {
      adres = `${selectedObject.street} ${selectedObject.housenumber},
        ${selectedObject.city}`;
    }

    const svgStyle = () => {
      if (selectedObject.labelcode_last === 'A') {
        return selectedObjectStyles.labelA;
      }
      if (selectedObject.labelcode_last === 'B') {
        return selectedObjectStyles.labelB;
      }
      if (selectedObject.labelcode_last === 'C') {
        return selectedObjectStyles.labelC;
      }
      if (selectedObject.labelcode_last === 'D') {
        return selectedObjectStyles.labelD;
      }
      if (selectedObject.labelcode_last === 'E') {
        return selectedObjectStyles.labelE;
      }
      if (selectedObject.labelcode_last === 'F') {
        return selectedObjectStyles.labelF;
      }
      if (selectedObject.labelcode_last === 'G') {
        return selectedObjectStyles.labelG;
      }
      return selectedObjectStyles.labelUnknown;
    };

    const geolocationButton = (
      'geolocation' in navigator &&
      window.mobilecheck() === true
    ) ?
      <Button
        onClick={this.handleGeoLocation}
        bsStyle='info'
        bsSize='lg'>
        <i className='fa fa-crosshairs' />
      </Button>
    :
    '';

    const initialLocation = {
      lat: (postcode &&
        postcode.maplocation &&
        postcode.maplocation.lng) ?
        Number(postcode.maplocation.lng) :
        52.1741,
      lng: (postcode &&
        postcode.maplocation &&
        postcode.maplocation.lat) ?
        Number(postcode.maplocation.lat) :
        5.2032,
    };

    const position = [initialLocation.lat, initialLocation.lng];

    return (
      <div>
        <div>
          <Grid>
            <Row>
              <Col md={12}>
                <h2 />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <img
                  src={logo}
                  className={styles.Logo}
                />
                <div className={`jumbotron ${styles.Jumbo}`}>
                  <Row>
                    <Col md={9} sm={9} xs={9}>
                      <h1 className={styles.Title}>Mijn Waterlabel&nbsp;
                      <i style={{ cursor: 'pointer' }}
                        onClick={this.openIntro}
                        className='fa fa-1x fa-info-circle' /></h1>
                    </Col>
                    <Col md={3} sm={3} xs={3}>
                      &nbsp;
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}><hr/></Col>
                  </Row>
                  <Row>
                    <Col md={10}>
                      <Col md={3}>
                        <div className='form-group'>
                          <label htmlFor='postcode'>Postcode</label>
                          <input
                            ref='postcode'
                            onKeyPress={this.handleKeyPress}
                            id='postcode'
                            type='text'
                            style={{ textTransform: 'uppercase' }}
                            placeholder={(postcode.selectedObject) ?
                              postcode.selectedObject.properties.postalcode : '3731HS'}
                            className='form-control input-lg'
                          />
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className='form-group'>
                          <label htmlFor='huisnummer'>Huisnummer</label>
                          <input
                            ref='huisnummer'
                            onKeyPress={this.handleKeyPress}
                            id='huisnummer'
                            type='number'
                            placeholder={(postcode.selectedObject) ?
                              postcode.selectedObject.properties.housenumber : 184}
                            className='form-control input-lg'
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className='form-group'>
                          <ButtonGroup style={{ marginTop: 25 }}>
                            <Button
                              disabled={(postcode.isFetching) ? true : false}
                              bsStyle='info'
                              onClick={this.handleSearchButton}
                              bsSize='lg'>
                              <i className='fa fa-search' />&nbsp;
                              {(postcode.isFetching) ? 'Even geduld a.u.b...' : 'Zoek'}
                            </Button>
                            {geolocationButton}
                          </ButtonGroup>
                        </div>
                      </Col>
                    </Col>
                    <Col md={6}/>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {postcode.selectedObject ?
                  <div
                    id='results'
                    className={`jumbotron ${styles.Jumbo}`}>
                    <div className={styles.CloseButton}>
                      <i onClick={() => dispatch(clearSelectedObject())} className='fa fa-close' />
                    </div>

                    <h2 className={calculatorStyles.GroupLabel}>{adres}</h2>
                    <hr/>
                      <span className={styles.Label}>
                        {postcode.selectedObject.properties.labelcode_last}
                      </span>
                      <ol className={calculatorStyles.labels}>
                        <li>
                          <svg className={calculatorStyles.labelA}
                               width='108.5'
                               height='17'>
                            <polygon
                              points='0,0 100,0 108.5,8.5 100,17 0,17' />
                            <text
                              style={{ 'fill': 'white' }}
                              x='2'
                              y='13'>A
                            </text>
                          </svg>
                          {(postcode.selectedObject.properties.labelcode_last === 'A') ?
                          <svg
                            className={calculatorStyles.labelA}
                            width='48.5'
                            height='17'>
                            <text style={{ 'fill': 'black' }}
                                  x='10'
                                  y='13'>&larr;
                            </text>
                          </svg> : ''}
                        </li>
                        <li>
                          <svg
                            className={calculatorStyles.labelB}
                            width='98.5'
                            height='17'>
                              <polygon
                                points='0,0 90,0 98.5,8.5 90,17 0,17' />
                              <text
                                style={{ 'fill': 'white' }}
                                x='2'
                                y='13'>B
                              </text>
                          </svg>
                          {(postcode.selectedObject.properties.labelcode_last === 'B') ?
                          <svg
                            className={calculatorStyles.labelB}
                            width='48.5'
                            height='17'>
                              <text
                                style={{ 'fill': 'black' }}
                                x='10'
                                y='13'>&larr;
                              </text>
                          </svg> : ''}
                        </li>
                        <li>
                          <svg
                            className={calculatorStyles.labelC}
                            width='88.5'
                            height='17'>
                              <polygon
                                points='0,0 80,0 88.5,8.5 80,17 0,17' />
                              <text
                                style={{ 'fill': 'white' }}
                                x='2'
                                y='13'>C
                              </text>
                          </svg>
                          {(postcode.selectedObject.properties.labelcode_last === 'C') ?
                          <svg
                            className={calculatorStyles.labelC}
                            width='48.5'
                            height='17'>
                              <text
                                style={{ 'fill': 'black' }}
                                x='10'
                                y='13'>&larr;
                              </text>
                          </svg> : ''}
                        </li>
                        <li>
                          <svg
                            className={calculatorStyles.labelD}
                            width='78.5'
                            height='17'>
                              <polygon
                                points='0,0 70,0 78.5,8.5 70,17 0,17' />
                              <text
                                style={{ 'fill': 'white' }}
                                x='2'
                                y='13'>D
                              </text>
                          </svg>
                          {(postcode.selectedObject.properties.labelcode_last === 'D') ?
                          <svg
                            className={calculatorStyles.labelD}
                            width='48.5'
                            height='17'>
                              <text
                                style={{ 'fill': 'black' }}
                                x='10'
                                y='13'>&larr;
                              </text>
                          </svg> : ''}
                        </li>
                        <li>
                          <svg
                            className={calculatorStyles.labelE}
                            width='68.5'
                            height='17'>
                              <polygon
                                points='0,0 60,0 68.5,8.5 60,17 0,17' />
                              <text
                                style={{ 'fill': 'white' }}
                                x='2'
                                y='13'>E
                              </text>
                          </svg>
                          {(postcode.selectedObject.properties.labelcode_last === 'E') ?
                          <svg
                            className={calculatorStyles.labelE}
                            width='48.5'
                            height='17'>
                              <text
                                style={{ 'fill': 'black' }}
                                x='10'
                                y='13'>&larr;
                              </text>
                          </svg> : ''}
                        </li>
                        <li>
                          <svg
                            className={calculatorStyles.labelF}
                            width='58.5'
                            height='17'>
                              <polygon
                                points='0,0 50,0 58.5,8.5 50,17 0,17' />
                              <text
                                style={{ 'fill': 'white' }}
                                x='2'
                                y='13'>F
                              </text>
                          </svg>
                          {(postcode.selectedObject.properties.labelcode_last === 'F') ?
                          <svg
                            className={calculatorStyles.labelF}
                            width='48.5'
                            height='17'>
                              <text
                                style={{ 'fill': 'black' }}
                                x='10'
                                y='13'>&larr;
                              </text>
                          </svg> : ''}
                        </li>
                        <li>
                          <svg
                            className={calculatorStyles.labelG}
                            width='48.5'
                            height='17'>
                              <polygon
                                points='0,0 40,0 48.5,8.5 40,17 0,17' />
                              <text
                                style={{ 'fill': 'white' }}
                                x='2'
                                y='13'>G
                              </text>
                          </svg>
                          {(postcode.selectedObject.properties.labelcode_last === 'G') ?
                          <svg
                            className={calculatorStyles.labelG}
                            width='48.5'
                            height='17'>
                              <text
                                style={{ 'fill': 'black' }}
                                x='10'
                                y='13'>&larr;
                              </text>
                          </svg> : ''}
                        </li>
                      </ol>

                        <Map center={position}
                         ref='map'
                         dragging={false}
                         touchZoom={false}
                         keyboard={false}
                         doubleClickZoom={false}
                         scrollWheelZoom={false}
                         boxZoom={false}
                         zoomControl={false}
                         zoom={18}
                         onClick={this.openMap}
                         className={styles.Map}>
                          <TileLayer
                            attribution='Mapbox'
                            url='https://{s}.tiles.mapbox.com/v3/nelenschuurmans.5641a12c/{z}/{x}/{y}.png'
                          />
                          <TileLayer
                            attribution='Nelen &amp; Schuurmans'
                            url='/static_media/waterlabel/{z}/{x}/{y}.png'
                          />
                          <WMSTileLayer
                            attribution='&copy; Kadaster'
                            url='//geodata.nationaalgeoregister.nl/kadastralekaartv2/wms'
                            layers='perceel'
                            format='image/png'
                            transparent
                            minZoom={3}
                            maxZoom={20}
                          />
                          <TileLayer
                            attribution='Nelen &amp; Schuurmans'
                            url='https://{s}.tiles.mapbox.com/v3/nelenschuurmans.0a5c8e74/{z}/{x}/{y}.png'
                          />

                          {(postcode &&
                            postcode.selectedObject &&
                            postcode.selectedObject.geometry) ?
                            <GeoJsonUpdatable
                              data={postcode.selectedObject.geometry}
                              onEachFeature={(feature, layer) => {
                                layer.setStyle({
                                  'color': '#ffffff',
                                  'fill': false,
                                  'weight': 5,
                                  'opacity': 1,
                                  'dashArray': '5, 10',
                                });
                              }}
                            />
                          : ''}
                        </Map>

                    <table
                      className={`table-striped ${styles.ObjectPropertiesTable}`}>
                    <tbody>
                      <tr>
                        <td>Adres &amp; Woonplaats</td>
                        <td className='postcode'>{adres}</td>
                      </tr>
                      <tr>
                        <td>Postcode</td>
                        <td className='postcode'>{(postcode.selectedObject.properties.postalcode) ?
                            postcode.selectedObject.properties.postalcode.toUpperCase() : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: 'top' }}>Waterlabel</td>
                        <td className='waterlabel'>
                          <OverlayTrigger
                            trigger='click'
                            placement='bottom'
                            rootClose
                            overlay={
                            <Popover id='waterlabel' title='Legenda'>
                              <img
                                style={{
                                  width: 125,
                                  padding: 15,
                                  cursor: 'pointer',
                                }}
                                src={algemeen02} />
                            </Popover>
                          }>
                            <svg
                              className={svgStyle()}
                              width='48.5'
                              height='17'>
                              <polygon
                                points='0,0 40,0 48.5,8.5 40,17 0,17' />
                              <text
                                style={{ 'fill': 'white' }}
                                x='2'
                                y='13'>
                                {(postcode.selectedObject.properties.labelcode_last) ? postcode.selectedObject.properties.labelcode_last : '?'}
                              </text>
                            </svg>
                          </OverlayTrigger>
                          {(postcode.selectedObject &&
                            postcode.labelHistory.length > 0) ?
                            <div>
                              {postcode.labelHistory.map((label, i) => {
                                return <div key={i}>
                                         <svg
                                          className={
                                            this.historicalSvgStyle(label.fields.code)
                                          }
                                          width='48.5'
                                          height='17'>
                                          <polygon
                                            points='0,0 40,0 48.5,8.5 40,17 0,17' />
                                            <text
                                              style={{ 'fill': 'white' }}
                                              x='2'
                                              y='13'>
                                              {label.fields.code}
                                            </text>
                                         </svg>
                                         <span style={{
                                           verticalAlign: 5,
                                           fontSize: '0.8em',
                                           paddingLeft: 5,
                                         }}>
                                           {moment(label.fields.timestamp).locale('nl').format('LL')}
                                         </span>
                                       </div>;
                              })}
                            </div>
                            :
                            <Button
                              bsSize='xsmall'
                              className='pull-right'
                              onClick={this.handleShowHistory}>
                              Toon oude labels
                            </Button>
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Bouwjaar</td>
                        <td className='bouw-jaar'>
                          {selectedObject.yearbuilt}
                        </td>
                      </tr>
                      <tr>
                        <td>Dakoppervlak</td>
                        <td className='dakopp'>
                        {Math.round(postcode.sqm)} m<sup>2</sup>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                    <hr/>
                    <ButtonGroup>
                      <Button
                        bsSize='lg'
                        bsStyle='info'
                        onClick={this.openCalculator}>
                        <i className='fa fa-tag' />&nbsp;Waterlabel aanpassen
                      </Button>
                    </ButtonGroup>
                  </div>
                  :
                  ''
                }
              </Col>
            </Row>
            <Row>
              <Col md={10}>
                <ul className='list-inline'>
                  <li>
                    <a className={styles.InlineLink}
                       onClick={this.openAboutText}>Over Waterlabel
                    </a>
                  </li> &#8226;
                  <li>
                    <a className={styles.InlineLink}
                       onClick={this.openPrivacyText}>Cookies &amp; Privacy
                    </a>
                  </li> &#8226;
                  <li>
                    <a className={styles.InlineLink}
                       onClick={this.openMap}>Bekijk kaart
                    </a>
                  </li>
                </ul>
              </Col>
              <div className='pull-right' style={{ marginRight: 10 }}>
                <OverlayTrigger trigger='click' placement='top' rootClose overlay={
                  <Popover id='share' title='Deel je Waterlabel'>
                    <a href={`https://twitter.com/intent/tweet?screen_name=Waterlabel&text=${(postcode.selectedObject) ?
                      `Mijn huis heeft waterlabel ${postcode.selectedObject.label}.` :
                      ''}%20Check%20ook%20jouw%20waterlabel%20via&url=${encodeURIComponent(window.location.href.toString())}`}
                      className='btn btn-info twitter-mention-button'
                      dataShowCount>
                        <i className='fa fa-twitter' />&nbsp;Tweet
                    </a>
                  </Popover>
                }>
              <a style={{
                padding: '10px 5px 0 0',
                color: '#2EADD3',
                cursor: 'pointer',
              }}>
                <i className='fa fa-2x fa-share-square'/>
              </a>
              </OverlayTrigger>

                <a href='https://twitter.com/waterlabel/'
                   target='_blank'
                   style={{
                     padding: '10px 5px 0 0',
                     color: '#2EADD3',
                   }}>
                  <i className='fa fa-2x fa-twitter-square' />
                </a>
                <a
                  href='https://www.facebook.com/Waterlabel-1029529007100949/'
                  target='_blank'
                  style={{
                    padding: '10px 5px 0 0',
                    color: '#2EADD3',
                  }}>
                  <i
                    className='fa fa-2x fa-facebook-square' />
                </a>
                <a href='https://www.youtube.com/watch?v=jARteOPf_aI'
                   target='_blank'
                   style={{
                     padding: '10px 5px 0 0',
                     color: '#2EADD3',
                   }}>
                  <i className='fa fa-2x fa-youtube-square' />
                </a>
              </div>
            </Row>
          </Grid>
        </div>

        <Modal
          show={this.state.showCalculator}
          onHide={this.closeCalculator}
          dialogClassName={styles.WideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {(postcode.selectedObject) ?
                postcode.selectedObject.properties.street : ''},&nbsp;
              {(postcode.selectedObject) ?
                postcode.selectedObject.properties.housenumber : ''},&nbsp;
              {(postcode.selectedObject) ?
                postcode.selectedObject.properties.city : ''}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Calculator
              closeCalculator={this.closeCalculator}
              openMap={this.openMap}
              {...this.props}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeCalculator}>Sluiten</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showAboutText}
          onHide={this.closeAboutText}
          dialogClassName={styles.WideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Over Waterlabel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AboutText />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeAboutText}>Sluiten</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showPrivacyText}
          onHide={this.closePrivacyText}
          dialogClassName={styles.WideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cookies &amp; Privacy</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 style={{ color: '#2EADD3' }}>Cookies</h4>
            <p>
              Waterlabel.net maakt gebruik van cookies voor webstatistieken en
              onderzoek om daarmee inzicht te verkrijgen hoe bezoekers de
              website gebruiken. Deze informatie helpt ons om de site te
              verbeteren. Deze “analytics cookies” bevatten een (uniek) nummer.
              Ze bevatten geen persoonsgegevens.
            </p>
            <p>
              Waterlabel.net kan deze cookies niet gebruiken om u persoonlijk
              te herkennen. Ook kunnen cookies niet worden gebruikt om u op
              andere websites te herkennen. De verzamelde anonieme gegevens
              worden niet voor een ander doel gebruikt dan voor verbetering
              van de website en niet aan derden ter beschikking gesteld.
            </p>
            <h4 style={{ color: '#2EADD3' }}>Privacybeleid</h4>
            <p>
              Persoonsgegevens die u opgeeft, gebruikt Waterlabel alleen voor
              het doel waarvoor u ze heeft achtergelaten. Daarmee voldoet
              Waterlabel aan <a href='http://wetten.overheid.nl/BWBR0011468/2016-01-01' target='_blank'>
              de privacywetgeving</a>.
            </p>
            <h4 style={{ color: '#2EADD3' }}>Adblockers</h4>
            <p>
              Door het gebruik van Adblockers kan de website mogelijk minder
              goed functioneren.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closePrivacyText}>Sluiten</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showMap}
          onHide={this.closeMap}
          dialogClassName={styles.WideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {(postcode.selectedObject) ?
              <svg
                className={svgStyle()} width='48.5' height='17'>
                <polygon
                  points='0,0 40,0 48.5,8.5 40,17 0,17' />
                <text
                  style={{ 'fill': 'white' }}
                  x='2'
                  y='15'>
                  {postcode.selectedObject.properties.labelcode_last}
                </text>
              </svg>
              : ''}
              {(postcode.selectedObject) ?
              ` ${postcode.selectedObject.properties.street} ${postcode.selectedObject.properties.housenumber}, ${postcode.selectedObject.properties.city} ` :
              ''}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Grid fluid>
                <Row style={{
                  zIndex: 9,
                  position: 'absolute',
                }}>
                  <Col md={12}>
                    <SelectedObjectDetails
                      {...this.props}
                      openCalculator={this.openCalculator}
                    />
                  </Col>
                </Row>
                <Row style={{ height: window.innerHeight - 150 }}>
                  <Col>
                    <WaterlabelMap
                      {...this.props} />
                  </Col>
                </Row>
              </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeMap}>Sluiten</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showIntro}
          onHide={this.closeIntro}
          dialogClassName={styles.WideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Introductie
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Grid fluid>
                <Row>
                  <Col md={12}>
                    <div className='embed-responsive embed-responsive-16by9'>
                      <iframe
                        className='embed-responsive-item'
                        src='https://www.youtube.com/embed/jARteOPf_aI' />
                    </div>
                  </Col>
                </Row>
              </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeIntro}>Sluiten</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showInteractiveCalculator}
          onHide={this.closeInteractiveCalculator}
          dialogClassName={styles.WideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Interactieve Waterlabelcalculator (beta)
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Grid fluid>
                <Row>
                  <Col md={12}>
                    <Row style={{
                      height: window.innerHeight - 150
                    }}>
                      <Col>
                        <InteractiveCalculator {...this.props} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeInteractiveCalculator}>
              Sluiten
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  postcode: PropTypes.any,
};

function mapStateToProps(state) {
  return {
    choropleth: state.choropleth,
    postcode: state.postcode,
    calculator: state.calculator.present,
  };
}

export default connect(mapStateToProps)(App);

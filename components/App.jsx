import L from 'leaflet';
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet';
import GeoJsonUpdatable from '../lib/GeoJsonUpdatable.jsx';
import moment from 'moment';
import swal from 'sweetalert';
import { ActionCreators } from 'redux-undo';
import { connect } from 'react-redux';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import AboutText from './AboutText.jsx';
import algemeen02 from '../images/algemeen02.png';
import Calculator from './Calculator.jsx';
import InteractiveCalculator from './InteractiveCalculator.jsx';
import logo from '../images/logowaterlabel.svg';
import queryString from 'query-string';
import React, { Component, PropTypes } from 'react';
import SearchWidget from './SearchWidget.jsx';
import SelectedObjectDetails from './SelectedObjectDetails.jsx';
import selectedObjectStyles from './SelectedObjectDetails.css';
import calculatorStyles from './Calculator.css';
import styles from './App.css';
import WaterlabelMap from './WaterlabelMap.jsx';
import $ from 'jquery';
require('!style!css!../node_modules/sweetalert/dist/sweetalert.css');

import {
  clearSelectedObject,
  lookupPostcode,
  radiusSearch,
  fetchHistory,
} from '../actions.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCalculator: false,
      showInteractiveCalculator: false,
      showMap: false,
      showAboutText: false,
      showPrivacyText: false,
      showIntro: false,
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

  parseLocationString(e) {
    const parsed = queryString.parse(location.hash);

    const lat = (parsed.lat) ? parsed.lat : undefined;
    const lng = (parsed.lng) ? parsed.lng : undefined;
    const zoom = (parsed.zoom) ? parsed.zoom : undefined;
    const postcode = (parsed.postcode) ? parsed.postcode : undefined;
    const nr = (parsed.nr) ? parsed.nr : undefined;

    if (lat && lng && zoom && !postcode && !nr) {
      // console.log('Zoom to location by', lat, lng, zoom);
      // this.props.dispatch(setMapLocation({ lat:lat, lng: lng, zoom: zoom }));
    }

    if (!lat && !lng && !zoom && postcode && nr) {
      // console.log('Look up postcode, zoom to location, open infowindow, show object', postcode, nr)
      this.props.dispatch(lookupPostcode(postcode, nr));
    }
  }

  componentDidMount() {
    localStorage.setItem('showIntro', true);
    document.getElementById('postcode').focus();
    window.addEventListener('load', this.parseLocationString);
    window.addEventListener('hashchange', this.parseLocationString);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.parseLocationString);
    window.removeEventListener('hashchange', this.parseLocationString);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  componentWillReceiveProps(props) {
    if (props.postcode.selectedObject) {
      $('html, body').animate({
        scrollTop: 500,
      }, 500);
    }
  }

  handleKeyDown(e) {
    if (e.which === 90 && e.ctrlKey) {
      this.handleUndo();
    }
  }

  handleShowHistory() {
    this.props.dispatch(fetchHistory(this.props.postcode.selectedObject.gid));
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

    var rege = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
    if(rege.test(postcodeFormatted) && Number.isInteger(Number(huisnummerFormatted))) {
      this.props.dispatch(lookupPostcode(postcodeFormatted, huisnummerFormatted));
    }
  }

  handleKeyPress(e) {
    // const self = this;
    if (e.key === 'Enter') {
      const postcodeFormatted = this.refs.postcode.value;
      const huisnummerFormatted = this.refs.huisnummer.value;

      var rege = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
      if(rege.test(postcodeFormatted) && Number.isInteger(Number(huisnummerFormatted))) {
        this.props.dispatch(lookupPostcode(postcodeFormatted, huisnummerFormatted));
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

    let geocoded;
    let woonplaats = '?';
    let straat = '?';
    let adres;

    const selectedObject = (this.props.postcode &&
      this.props.postcode.selectedObject &&
      this.props.postcode.selectedObject.gid) ?
      this.props.postcode.selectedObject : undefined;

    try {
      geocoded = selectedObject.geocoded.results[0].address_components;
      adres = `${geocoded[1].long_name} ${selectedObject.huisnummer}, ${geocoded[3].long_name}`;
    } catch (e) {}

    const svgStyle = () => {
      if (selectedObject.label === 'A') { return selectedObjectStyles.labelA; }
      if (selectedObject.label === 'B') { return selectedObjectStyles.labelB; }
      if (selectedObject.label === 'C') { return selectedObjectStyles.labelC; }
      if (selectedObject.label === 'D') { return selectedObjectStyles.labelD; }
      if (selectedObject.label === 'E') { return selectedObjectStyles.labelE; }
      if (selectedObject.label === 'F') { return selectedObjectStyles.labelF; }
      if (selectedObject.label === 'G') { return selectedObjectStyles.labelG; }
      return selectedObjectStyles.labelG;
    };

    const geolocationButton = ('geolocation' in navigator && window.mobilecheck() === true) ?
      <Button
        onClick={this.handleGeoLocation}
        bsStyle='info'
        bsSize='lg'>
        <i className='fa fa-crosshairs'></i>
      </Button> :
      '';

    const initialLocation = {
      lat: (this.props.postcode &&
        this.props.postcode.selectedObject &&
        this.props.postcode.selectedObject.lng) ?
        Number(this.props.postcode.selectedObject.lng) :
        52.1741,
      lng: (this.props.postcode &&
        this.props.postcode.selectedObject &&
        this.props.postcode.selectedObject.lat) ?
        Number(this.props.postcode.selectedObject.lat) :
        5.2032,
    };

    const position = [initialLocation.lat, initialLocation.lng];

    return (
      <div>
        <div>
          <Grid>
            <Row>
              <Col md={12}>
                <h2></h2>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <img
                  src={logo}
                  style={{
                    position: 'absolute',
                    width: 70,
                    right: 35,
                    top: -20,
                    zIndex: 999,
                  }}
                />
                <div className="jumbotron" style={{ backgroundColor: '#fff', border: '1px solid gainsboro' }}>
                  <Row>
                    <Col md={9} sm={9} xs={9}>
                      <h1 className={styles.Title}>Mijn Waterlabel&nbsp;
                      <i style={{ cursor: 'pointer' }}
                        onClick={this.openIntro} className="fa fa-1x fa-info-circle"></i></h1>
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
                          <label for="postcode">Postcode</label>
                          <input
                            ref="postcode"
                            onKeyPress={this.handleKeyPress}
                            id='postcode'
                            type="text"
                            style={{ textTransform: 'uppercase' }}
                            placeholder={(this.props.postcode.selectedObject) ?
                              this.props.postcode.selectedObject.postcode : '3731HS'}
                            className="form-control input-lg"
                          />
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className='form-group'>
                          <label for="huisnummer">Huisnummer</label>
                          <input
                            ref="huisnummer"
                            onKeyPress={this.handleKeyPress}
                            id='huisnummer'
                            type="number"
                            placeholder={(this.props.postcode.selectedObject) ?
                              this.props.postcode.selectedObject.huisnummer : 184}
                            className="form-control input-lg"
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className='form-group'>
                          <ButtonGroup style={{ marginTop: 25 }}>
                            <Button
                              bsStyle='info'
                              onClick={this.handleSearchButton}
                              bsSize='lg'>
                              <i className="fa fa-search"></i>&nbsp;Zoek
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
                {this.props.postcode.selectedObject ?
                  <div
                    id='results'
                    className="jumbotron"
                    style={{ backgroundColor: '#fff', border: '1px solid gainsboro' }}>
                    <div
                      style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        right: 25,
                        top: 10,
                      }}><i onClick={() => this.props.dispatch(clearSelectedObject())} className="fa fa-close"></i>
                    </div>

                    <h2 className={calculatorStyles.GroupLabel}>{adres}</h2>
                    <hr/>
                      <span className='' style={{ position: 'absolute', left: 225, fontSize: '5em', fontWeight: 'bold' }}>{this.props.postcode.selectedObject.label}</span>
                      <ol className={calculatorStyles.labels}>
                          <li>
                              <svg className={calculatorStyles.labelA} width='108.5' height='17'>
                                  <polygon points='0,0 100,0 108.5,8.5 100,17 0,17'></polygon>
                                  <text style={{'fill':'white'}} x='2' y='13'>A</text>
                              </svg>
                              {(this.props.postcode.selectedObject.label === 'A') ?
                              <svg className={calculatorStyles.labelA} width='48.5' height='17'>
                                  <text style={{'fill':'black'}} x='10' y='13'>&larr;</text>
                              </svg> : ''}
                          </li>
                          <li>
                              <svg className={calculatorStyles.labelB} width='98.5' height='17'>
                                  <polygon points='0,0 90,0 98.5,8.5 90,17 0,17'></polygon>
                                  <text style={{'fill':'white'}} x='2' y='13'>B</text>
                              </svg>
                              {(this.props.postcode.selectedObject.label === 'B') ?
                              <svg className={calculatorStyles.labelB} width='48.5' height='17'>
                                  <text style={{'fill':'black'}} x='10' y='13'>&larr;</text>
                              </svg> : ''}
                          </li>
                          <li>
                              <svg className={calculatorStyles.labelC} width='88.5' height='17'>
                                  <polygon points='0,0 80,0 88.5,8.5 80,17 0,17'></polygon>
                                  <text style={{'fill':'white'}} x='2' y='13'>C</text>
                              </svg>
                              {(this.props.postcode.selectedObject.label === 'C') ?
                              <svg className={calculatorStyles.labelC} width='48.5' height='17'>
                                  <text style={{'fill':'black'}} x='10' y='13'>&larr;</text>
                              </svg> : ''}
                          </li>
                          <li>
                              <svg className={calculatorStyles.labelD} width='78.5' height='17'>
                                  <polygon points='0,0 70,0 78.5,8.5 70,17 0,17'></polygon>
                                  <text style={{'fill':'white'}} x='2' y='13'>D</text>
                              </svg>
                              {(this.props.postcode.selectedObject.label === 'D') ?
                              <svg className={calculatorStyles.labelD} width='48.5' height='17'>
                                  <text style={{'fill':'black'}} x='10' y='13'>&larr;</text>
                              </svg> : ''}
                          </li>
                          <li>
                              <svg className={calculatorStyles.labelE} width='68.5' height='17'>
                                  <polygon points='0,0 60,0 68.5,8.5 60,17 0,17'></polygon>
                                  <text style={{'fill':'white'}} x='2' y='13'>E</text>
                              </svg>
                              {(this.props.postcode.selectedObject.label === 'E') ?
                              <svg className={calculatorStyles.labelE} width='48.5' height='17'>
                                  <text style={{'fill':'black'}} x='10' y='13'>&larr;</text>
                              </svg> : ''}
                          </li>
                          <li>
                              <svg className={calculatorStyles.labelF} width='58.5' height='17'>
                                  <polygon points='0,0 50,0 58.5,8.5 50,17 0,17'></polygon>
                                  <text style={{'fill':'white'}} x='2' y='13'>F</text>
                              </svg>
                              {(this.props.postcode.selectedObject.label === 'F') ?
                              <svg className={calculatorStyles.labelF} width='48.5' height='17'>
                                  <text style={{'fill':'black'}} x='10' y='13'>&larr;</text>
                              </svg> : ''}
                          </li>
                          <li>
                              <svg className={calculatorStyles.labelG} width='48.5' height='17'>
                                  <polygon points='0,0 40,0 48.5,8.5 40,17 0,17'></polygon>
                                  <text style={{'fill':'white'}} x='2' y='13'>G</text>
                              </svg>
                              {(this.props.postcode.selectedObject.label === 'G') ?
                              <svg className={calculatorStyles.labelG} width='48.5' height='17'>
                                  <text style={{'fill':'black'}} x='10' y='13'>&larr;</text>
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
                         style={{
                           width: '100%',
                           height: '150px',
                         }}>
                          <TileLayer
                            attribution='Mapbox'
                            url='https://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/{z}/{x}/{y}.png'
                          />
                          <TileLayer
                            attribution='Nelen &amp; Schuurmans'
                            url='https://waterlabeltiles.sandbox.lizard.net/bag/{z}/{x}/{y}.png'
                          />
                          <WMSTileLayer
                            attribution='&copy; Kadaster'
                            url='//geodata.nationaalgeoregister.nl/kadastralekaartv2/wms'
                            layers='perceel'
                            format='image/png'
                            transparent={true}
                            minZoom={3}
                            maxZoom={20}
                          />

                          {(this.props.postcode && this.props.postcode.selectedObject && this.props.postcode.selectedObject.geo) ?
                            <GeoJsonUpdatable
                              data={this.props.postcode.selectedObject.geo}
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

                    <table className={`table-striped ${styles.ObjectPropertiesTable}`}>
                    <tbody>
                      <tr>
                        <td>Adres &amp; Woonplaats</td>
                        <td className="postcode">{adres}</td>
                      </tr>
                      <tr>
                        <td>Postcode</td>
                        <td className="postcode">{(selectedObject.postcode) ?
                            selectedObject.postcode.toUpperCase() : '-'}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: 'top' }}>Waterlabel</td>
                        <td className="waterlabel">
                          <OverlayTrigger trigger="click" placement="bottom" rootClose overlay={
                            <Popover id='waterlabel' title="Legenda">
                              <img style={{ width: 125, padding: 15, cursor: 'pointer' }} src={algemeen02} />
                            </Popover>
                          }>
                            <svg className={svgStyle()} width="48.5" height="17">
                              <polygon points="0,0 40,0 48.5,8.5 40,17 0,17"></polygon>
                              <text style={{ 'fill': 'white' }} x="2" y="13">{selectedObject.label}</text>
                            </svg>
                          </OverlayTrigger>
                          {(this.props.postcode.selectedObject && this.props.postcode.labelHistory.length > 0) ?
                            <div>
                              {this.props.postcode.labelHistory.map((label, i) => {
                                return <div key={i}>
                                         <svg className={this.historicalSvgStyle(label[0][0])} width="48.5" height="17">
                                          <polygon points="0,0 40,0 48.5,8.5 40,17 0,17"></polygon>
                                          <text style={{ 'fill': 'white' }} x="2" y="13">{label[0][0]}</text>
                                         </svg>{label[0][1]}
                                         <span style={{
                                             verticalAlign: 5,
                                             fontSize: '0.8em',
                                             paddingLeft: 5,
                                           }}>{moment(label[1]).format('LL')}
                                         </span>
                                       </div>;
                              })}
                            </div>
                            :
                            <Button bsSize='xsmall' className='pull-right' onClick={this.handleShowHistory}>Toon oude labels</Button>
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Bouwjaar</td>
                        <td className="bouw-jaar">{selectedObject.bouwjaar}</td>
                      </tr>
                      <tr>
                        <td>Dakoppervlak</td>
                        <td className="dakopp">{Math.round(selectedObject.sqm)} m²</td>
                      </tr>
                      </tbody>
                    </table>
                    <hr/>
                    <ButtonGroup>
                      <Button bsSize='lg' bsStyle='info' onClick={this.openCalculator}>
                        <i className="fa fa-tag"></i>&nbsp;Waterlabel aanpassen
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
                <ul className="list-inline">
                  <li><a style={{ cursor: 'pointer', color: '#2EADD3' }} onClick={this.openAboutText}>Over Waterlabel</a></li>
                  <li><a style={{ cursor: 'pointer', color: '#2EADD3' }} onClick={this.openPrivacyText}>Cookies &amp; Privacy</a></li>
                  <li><a style={{ cursor: 'pointer', color: '#2EADD3' }} onClick={this.openMap}>Bekijk kaart</a></li>
                </ul>
              </Col>
              <div className='pull-right' style={{ marginRight: 10 }}>

                <OverlayTrigger trigger="click" placement="top" rootClose overlay={
                  <Popover id='share' title="Deel je Waterlabel">
                    <a href={`https://twitter.com/intent/tweet?screen_name=Waterlabel&text=${(this.props.postcode.selectedObject) ? `Mijn huis heeft waterlabel ${this.props.postcode.selectedObject.label}.` : ''}%20Check%20ook%20jouw%20waterlabel%20via&url=${encodeURIComponent(window.location.href.toString())}`} className="btn btn-info twitter-mention-button" data-show-count="true">
                      <i className="fa fa-twitter"></i>&nbsp;Tweet
                    </a>
                  </Popover>
                }>
              <a style={{padding: '10px 5px 0 0', color: '#2EADD3', cursor: 'pointer' }}><i className='fa fa-2x fa-share-square'></i></a>
              </OverlayTrigger>

                <a href='https://twitter.com/waterlabel/' target='_blank' style={{padding: '10px 5px 0 0', color: '#2EADD3', }}><i className='fa fa-2x fa-twitter-square'></i></a>
                <a href='https://www.facebook.com/Waterlabel-1029529007100949/' target='_blank' style={{padding: '10px 5px 0 0', color: '#2EADD3',}}><i className='fa fa-2x fa-facebook-square'></i></a>
                <a href='https://www.youtube.com/watch?v=jARteOPf_aI' target='_blank' style={{padding: '10px 5px 0 0', color: '#2EADD3',}}><i className='fa fa-2x fa-youtube-square'></i></a>
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
              Waterlabel&nbsp;-&nbsp;
              {(this.props.postcode.selectedObject) ? this.props.postcode.selectedObject.postcode : ''},&nbsp;
              {(this.props.postcode.selectedObject) ? this.props.postcode.selectedObject.huisnummer : ''}
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
            <p>Waterlabel.net maakt gebruik van cookies voor webstatistieken en onderzoek om daarmee inzicht te verkrijgen hoe bezoekers de website gebruiken. Deze informatie helpt ons om de site te verbeteren. Deze “analytics cookies” bevatten een (uniek) nummer. Ze bevatten geen persoonsgegevens.</p>
            <p>Waterlabel.net kan deze cookies niet gebruiken om u persoonlijk te herkennen. Ook kunnen cookies niet worden gebruikt om u op andere websites te herkennen. De verzamelde anonieme gegevens worden niet voor een ander doel gebruikt dan voor verbetering van de website en niet aan derden ter beschikking gesteld.</p>
            <h4 style={{ color: '#2EADD3' }}>Privacybeleid</h4>
            <p>Persoonsgegevens die u opgeeft, gebruikt Waterlabel alleen voor het doel waarvoor u ze heeft achtergelaten. Daarmee voldoet Waterlabel aan <a href="http://wetten.overheid.nl/BWBR0011468/2016-01-01" target="_blank">de privacywetgeving</a>.</p>
            <h4 style={{ color: '#2EADD3' }}>Adblockers</h4>
            <p>Door het gebruik van Adblockers kan de website mogelijk minder goed functioneren.</p>
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
              {(this.props.postcode.selectedObject) ?
              <svg className={svgStyle()} width="48.5" height="17">
                <polygon points="0,0 40,0 48.5,8.5 40,17 0,17"></polygon>
                <text style={{'fill':'white'}} x="2" y="15">{selectedObject.label}</text>
              </svg>
              : ''}
              {(this.props.postcode.selectedObject) ? ` ${this.props.postcode.selectedObject.geocoded.results[0].formatted_address}` : ''}
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
                    <SearchWidget {...this.props} />
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
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/jARteOPf_aI"></iframe>
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
                    <Row style={{ height: window.innerHeight - 150 }}>
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
            <Button onClick={this.closeInteractiveCalculator}>Sluiten</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  // This function maps the Redux state to React Props.
  return {
    choropleth: state.choropleth,
    postcode: state.postcode,
    calculator: state.calculator.present,
  };
}

export default connect(mapStateToProps)(App);

import { Map, TileLayer, WMSTileLayer } from 'react-leaflet';
import GeoJsonUpdatable from '../lib/GeoJsonUpdatable.jsx';
import { Grid, Col, Row, Button, OverlayTrigger,
  Popover } from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';
import styles from './Calculator.css';
import swal from 'sweetalert';
import tt01 from '../images/tt01.png';
import tt02 from '../images/tt02.png';
import tt03 from '../images/tt03.png';
import tt04 from '../images/tt04.png';
import tt05 from '../images/tt05.png';
import tt06 from '../images/tt06.png';
import tt07 from '../images/tt07.png';
import tt08 from '../images/tt08.png';
import tt09 from '../images/tt09.png';
import tt10 from '../images/tt10.png';
import tt11 from '../images/tt11.png';
import tt12 from '../images/tt12.png';
import $ from 'jquery';
require('!style!css!../node_modules/sweetalert/dist/sweetalert.css');

import {
  computeLabel,
} from '../actions.jsx';

class Calculator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOwner: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleIsOwner = this.handleIsOwner.bind(this);
    this.handleSubmitNewLabel = this.handleSubmitNewLabel.bind(this);
  }

  componentDidMount() {
    // this.handleChange();
    window.addEventListener('hashchange', this.handleChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleChange);
  }

  handleIsOwner(e) {
    this.setState({
      isOwner: e.target.checked,
    }, () => {
      if (this.state.isOwner) {
        document.getElementById('inputEmail').focus();
      }
    });
  }

  handleSubmitNewLabel() {
    const self = this;
    const { postcode, calculator } = this.props;
    const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.refs.email.value === '') {
      swal(
        'E-mailadres niet ingevuld',
        'Je moet een geldig e-maildres opgeven...',
        'error');
      return false;
    }
    if (!re.test(this.refs.email.value)) {
      swal(
        'E-mailadres niet geldig',
        'Je moet een geldig e-maildres opgeven...',
        'error');
      return false;
    }

    const newCalculationValues = calculator.calculationvalues;

    $.ajax({
      type: 'POST',
      url: '/api/v1/newlabel/',
      data: {
        'email': this.refs.email.value,
        'new_label': calculator.label,
        'postalcode': postcode.selectedObject.properties.postalcode,
        'housenumber': postcode.selectedObject.properties.housenumber,
        'calculationvalues': JSON.stringify({
          'afvoer_dak_schuur': newCalculationValues.afvoer_dak_schuur,
          'groene_achtertuin': newCalculationValues.groene_achtertuin,
          'geveltuin': newCalculationValues.geveltuin,
          'berging_dak_woning': newCalculationValues.berging_dak_woning,
          'afvoer_dak_woning': newCalculationValues.afvoer_dak_woning,
          'groene_voortuin': newCalculationValues.groene_voortuin,
          'dak_woning': newCalculationValues.dak_woning,
          'perceel': newCalculationValues.perceel,
          'voortuin': newCalculationValues.voortuin,
          'dak_schuur_garage': newCalculationValues.dak_schuur_garage,
          'berging_dak_schuur': newCalculationValues.berging_dak_schuur,
          'regenton': newCalculationValues.regenton,
          'achtertuin': newCalculationValues.achtertuin,
        }),
      },
      success: () => {
        swal({
          title: 'We verwerken je Waterlabel',
          text: 'Bedankt voor je bijdrage! We zijn nu druk bezig om je nieuwe Waterlabel opnieuw op de kaart te zetten. Klik op OK om de nieuwe kaart te bekijken. Dit kan maximaal 5 seconden duren. Een momentje geduld s.v.p...',
          type: 'success',
          customClass: 'areyousure',
          closeOnConfirm: false,
          showLoaderOnConfirm: true,
        }, () => {
          setTimeout(() => {
            swal({
              title: 'Je nieuwe Waterlabel is klaar!',
              text: 'Bedankt voor het wachten, je Waterlabel is opnieuw gegenereerd.',
              type: 'success',
            });
            window.location.reload();
          }, 5000);
        });
      },
      failure: (errMsg) => {
        swal(
          'Foutmelding',
          'Er ging iets verkeerd, laat het ons weten via info@nelen-schuurmans.nl',
          'error');
        console.log(errMsg);
      },
    });

    // Skipping posting via Redux for now... no obvious advantage in doing so?
    // dispatch(submitNewLabel(postcode.selectedObject));
    return true;
  }

  handleChange() {
    const { dispatch } = this.props;
    const values = {
      achtertuin: Number(this.refs.achtertuin.value),
      afvoer_dak_schuur: this.refs.afvoer_dak_schuur.value,
      afvoer_dak_woning: this.refs.afvoer_dak_woning.value,
      berging_dak_schuur: Number(this.refs.berging_dak_schuur.value),
      berging_dak_woning: Number(this.refs.berging_dak_woning.value),
      dak_schuur_garage: Number(this.refs.dak_schuur_garage.value),
      dak_woning: Number(this.refs.dak_woning.value),
      geveltuin: this.refs.geveltuin.value,
      groene_achtertuin: Number(this.refs.groene_achtertuin.value),
      groene_voortuin: Number(this.refs.groene_voortuin.value),
      perceel: Number(this.refs.perceel.value),
      regenton: Number(this.refs.regenton.value),
      voortuin: Number(this.refs.voortuin.value),
    };
    dispatch(computeLabel(values));
  }

  render() {

    const { postcode, calculator } = this.props;

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

    const sqm = postcode.sqm;

    const calculationvalues = (postcode && postcode.selectedObject) ?
      postcode.selectedObject.calculationvalues :
      {};

    return (
      <Grid fluid>
        <Row>
          <Col md={6}>
        <h2 className={styles.GroupLabel}>Mijn Perceeloppervlak</h2>
        <hr/>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Dak woning&nbsp;
            <OverlayTrigger
              trigger={['click']}
              rootClose
              placement='bottom'
              overlay={<Popover
                        id='helptext-dak-woning'
                        style={{ zIndex: 99999999 }}
                        title='Dak woning (m2)'>
                          <img
                            style={{ width: '100%' }}
                            src={tt02}/>
                          Het oppervlak van het dak van de woning of het
                          (hoofd)gebouw.&nbsp;
                          Bij schuine daken telt het horizontale oppervlak.
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <div className='input-group'>
              <input
                ref='dak_woning'
                type='number'
                min='0'
                className='form-control'
                id='dakwoning'
                onChange={this.handleChange}
                defaultValue={sqm}
              />
              <div className='input-group-addon'>m<sup>2</sup></div>
              </div>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Dak schuur/garage&nbsp;
            <OverlayTrigger
              trigger={'click'}
              rootClose
              placement='bottom'
              overlay={<Popover
                        id='helptext-dak-schuur-garage'
                        style={{ zIndex: 99999999 }}
                        title='Dak schuur/garage (m2)'>
                          <img
                            style={{ width: '100%' }}
                            src={tt03}/>
                          Het totale dakoppervlak van de schuur, garage, afdak
                          etc. die op het perceel staan. Bij schuine daken telt
                          het horizontale oppervlak.
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <div className='input-group'>
              <input
                ref='dak_schuur_garage'
                type='number'
                min='0'
                className='form-control'
                id='dakschuurgarage'
                onChange={this.handleChange}
                value={
                  (calculator.calculationvalues) ?
                  Math.round(calculator.calculationvalues.dak_schuur_garage) :
                  Math.round(calculationvalues.dak_schuur_garage)
                } />
                <div className='input-group-addon'>m<sup>2</sup></div>
                </div>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Achtertuin&nbsp;
            <OverlayTrigger
              trigger={'click'}
              rootClose
              placement='bottom'
              overlay={<Popover
                        id='helptext-achtertuin'
                        style={{ zIndex: 99999999 }}
                        title='Achtertuin (m2)'>
                          <img style={{ width: '100%' }} src={tt05}/>
                          De achtertuin ligt achter het huis, gezien vanaf de
                          straat. De garage/schuur telt hier niet mee.
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <div className='input-group'>
              <input
                ref='achtertuin'
                type='number'
                min='0'
                className='form-control'
                id='achtertuin'
                onChange={this.handleChange}
                value={
                  (calculator.calculationvalues) ?
                  Math.round(calculator.calculationvalues.achtertuin) :
                  Math.round(calculationvalues.achtertuin)
                } />
                <div className='input-group-addon'>m<sup>2</sup></div>
                </div>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Voortuin&nbsp;
            <OverlayTrigger
              trigger={'click'}
              rootClose
              placement='bottom'
              overlay={<Popover
                        id='helptext-voortuin'
                        style={{ zIndex: 99999999 }}
                        title='Voortuin (m2)'>
                          <img style={{ width: '100%' }} src={tt04}/>
                          De voortuin ligt aan de straat. De garage/schuur telt
                          hier niet mee.
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <div className='input-group'>
              <input
                ref='voortuin'
                type='number'
                min='0'
                className='form-control'
                id='voortuin'
                onChange={this.handleChange}
                value={
                  (calculator.calculationvalues) ?
                  Math.round(calculator.calculationvalues.voortuin) :
                  Math.round(calculationvalues.voortuin)
                } />
                <div className='input-group-addon'>m<sup>2</sup></div>
                </div>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Totaal&nbsp;
            <OverlayTrigger
              trigger={'click'}
              placement='bottom'
              rootClose
              overlay={<Popover
                        id='helptext-totaal'
                        style={{ zIndex: 99999999 }}
                        title='Perceel (m2)'>
                          <img style={{ width: '100%' }} src={tt01}/>
                          Het perceel is het totale oppervlak van het gebouw
                          en de eventuele achtertuin, voortuin en schuur samen.
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <input
                ref='perceel'
                type='hidden'
                className='hidden'
                id='perceel'
                value={
                  (calculator.calculationvalues) ?
                  Math.round(calculator.calculationvalues.perceel) :
                  Math.round(calculationvalues.perceel)
                } />
              {(calculator.calculationvalues) ?
                Math.round(calculator.calculationvalues.perceel) :
                0
              } m<sup>2</sup>
            </div>
          </div>

        <h2 className={styles.GroupLabel}>Mijn dak</h2>
        <hr/>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Berging dak woning&nbsp;
            <OverlayTrigger
              trigger={'click'}
              rootClose
              placement='bottom'
              overlay={<Popover
                        id='helptext-berging-dak-woning'
                        style={{ zIndex: 99999999 }}
                        title='Berging dak woning (m2)'>
                          <img style={{ width: '100%' }} src={tt06} />
                          De dakberging is het oppervlak van de woning dat
                          tenminste 2 cm water kan vasthouden. Dit kan
                          bijvoorbeeld dak zijn met beplanting (een groen dak)
                          of met een waterberging (een blauw dak).
                          <br/>
                          <a
                            target='_blank'
                            href='https://www.rainproof.nl/tips/dak'>
                            <button
                              className='btn btn-xs btn-success'>
                              <i className='fa fa-lightbulb-o' />&nbsp;Tip
                            </button>
                          </a>
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <div className='input-group'>
              <input
                ref='berging_dak_woning'
                type='number'
                min='0'
                className='form-control'
                id='bergingdakwoning'
                onChange={this.handleChange}
                value={
                  (calculator.calculationvalues) ?
                  Math.round(calculator.calculationvalues.berging_dak_woning) :
                  Math.round(calculationvalues.berging_dak_woning)
                }
              />
              <div className='input-group-addon'>m<sup>2</sup></div>
              </div>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Afvoer dak woning&nbsp;
            <OverlayTrigger
              trigger={'click'}
              rootClose
              placement='bottom'
              overlay={<Popover
                        id='helptext-afvoer-dak-woning'
                        style={{ zIndex: 99999999 }}
                        title='Afvoer dak woning'>
                          <img style={{ width: '100%' }} src={tt07} />
                          Waar stroomt het water heen?	Het water van een dak
                          stroomt naar de riolering of via een afgekoppelde
                          regenpijp naar de tuin.
                          <br/>
                          <a
                            target='_blank'
                            href='https://www.rainproof.nl/toolbox/maatregelen/regenpijp-afkoppelen'>
                            <button className='btn btn-xs btn-success'>
                              <i className='fa fa-lightbulb-o' />
                              &nbsp;Tip
                            </button>
                          </a>
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <select
                className='form-control'
                ref='afvoer_dak_woning'
                onChange={this.handleChange}
                value={
                  (calculator.calculationvalues) ?
                  calculator.calculationvalues.afvoer_dak_woning :
                  calculationvalues.afvoer_dak_woning
                }>
                <option value='' />
                <option value='Gemengd stelsel'>Gemengd riool</option>
                <option value='Regenwater stelsel'>Regenwater riool</option>
                <option value='Infiltratieriool'>Infiltratie riool</option>
                <option value='Tuin'>Tuin</option>
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Berging dak schuur&nbsp;
            <OverlayTrigger
              trigger={'click'}
              rootClose
              placement='bottom'
              overlay={<Popover
                        id='helptext-berging-dak-schuur'
                        style={{ zIndex: 99999999 }}
                        title='Berging dak schuur (m2)'>
                          <img
                            style={{ width: '100%' }}
                            src={tt08} />
                          De dakberging is het oppervlak van de schuur of
                          garage dat tenminste 2 cm water kan vasthouden. Dit
                          kan bijvoorbeeld dak zijn met beplanting (een groen
                          dak) of met een waterberging (een blauw dak).
                          <br/>
                          <a
                            target='_blank'
                            href='https://www.rainproof.nl/tips/dak'>
                            <button
                              className='btn btn-xs btn-success'>
                              <i className='fa fa-lightbulb-o' />
                              &nbsp;Tip
                            </button>
                          </a>
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <div className='input-group'>
              <input
                ref='berging_dak_schuur'
                type='number'
                min='0'
                className='form-control'
                id='bergingdakschuur'
                onChange={this.handleChange}
                value={
                  (calculator.calculationvalues) ?
                  Math.round(calculator.calculationvalues.berging_dak_schuur) :
                  Math.round(calculationvalues.berging_dak_schuur)
                }
                />
                <div className='input-group-addon'>m<sup>2</sup></div>
                </div>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Afvoer dak schuur&nbsp;
            <OverlayTrigger
              trigger={'click'}
              rootClose
              placement='bottom'
              overlay={<Popover
                        id='helptext-afvoer-dak-schuur'
                        style={{ zIndex: 99999999 }}
                        title='Afvoer dak schuur'>
                          <img
                            style={{ width: '100%' }}
                            src={tt09} />
                            Waar stroomt het water heen? Het water van een dak
                            stroomt naar de riolering of via een afgekoppelde
                            regenpijp naar de tuin.
                            <br/>
                            <a
                              target='_blank'
                              href='https://www.rainproof.nl/toolbox/maatregelen/regenpijp-afkoppelen'>
                              <button
                                className='btn btn-xs btn-success'>
                                <i className='fa fa-lightbulb-o' />
                                &nbsp;Tip
                              </button>
                            </a>
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <select
                className='form-control'
                ref='afvoer_dak_schuur'
                onChange={this.handleChange}
                value={
                  (calculator.calculationvalues) ?
                  calculator.calculationvalues.afvoer_dak_schuur :
                  calculationvalues.afvoer_dak_schuur
                }>
                <option value='' />
                <option value='Gemengd stelsel'>Gemengd riool</option>
                <option value='Regenwater stelsel'>Regenwater riool</option>
                <option value='Infiltratieriool'>Infiltratie riool</option>
                <option value='Tuin'>Tuin</option>
              </select>
            </div>
          </div>

        <h2 className={styles.GroupLabel}>Mijn tuin</h2>
        <hr/>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Groene achtertuin&nbsp;
            <OverlayTrigger
              trigger={'click'}
              rootClose
              placement='top'
              overlay={<Popover
                        id='helptext-groene-achtertuin'
                        style={{ zIndex: 99999999 }}
                        title='Groene achtertuin (m2)'>
                          <img
                            style={{ width: '100%' }}
                            src={tt11} />
                            Het oppervlak in de achtertuin waar regen direct in
                            de grond kan zakken, zoals gras, kiezels of aarde.
                          <br/>
                          <a
                            target='_blank'
                            href='https://www.rainproof.nl/tips/tuin'>
                            <button
                              className='btn btn-xs btn-success'>
                              <i className='fa fa-lightbulb-o' />&nbsp;Tip
                            </button>
                          </a>
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <div className='input-group'>
              <input
                ref='groene_achtertuin'
                type='number'
                min='0'
                className='form-control'
                id='groeneachtertuin'
                onChange={this.handleChange}
                value={
                  (calculator.calculationvalues) ?
                  Math.round(calculator.calculationvalues.groene_achtertuin) :
                  Math.round(calculationvalues.groene_achtertuin)
                }
              />
              <div className='input-group-addon'>m<sup>2</sup></div>
              </div>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Groene voortuin&nbsp;
            <OverlayTrigger
              trigger={'click'}
              rootClose
              placement='top'
              overlay={<Popover
                        id='helptext-groene-voortuin'
                        style={{ zIndex: 99999999 }}
                        title='Groene voortuin (m2)'>
                          <img
                            style={{ width: '100%' }}
                            src={tt10}/>
                            Het oppervlak in de voortuin waar regen direct in
                            de grond kan zakken, zoals gras, kiezels of aarde.
                          <br/>
                          <a
                            target='_blank'
                            href='https://www.rainproof.nl/tips/tuin'>
                            <button className='btn btn-xs btn-success'>
                              <i className='fa fa-lightbulb-o' />&nbsp;Tip
                            </button>
                          </a>
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <div className='input-group'>
              <input
                ref='groene_voortuin'
                type='number'
                min='0'
                className='form-control'
                id='groenevoortuin'
                onChange={this.handleChange}
                value={
                  (calculator.calculationvalues) ?
                  Math.round(calculator.calculationvalues.groene_voortuin) :
                  Math.round(calculationvalues.groene_voortuin)
                }
              />
              <div className='input-group-addon'>m<sup>2</sup></div>
              </div>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Regenton&nbsp;
            <OverlayTrigger
              trigger={'click'}
              rootClose
              placement='top'
              overlay={<Popover
                        id='helptext-regenton'
                        style={{ zIndex: 99999999 }}
                        title='Regenton (Liter)'>
                          <img
                            style={{ width: '100%' }}
                            src={tt12}/>
                            Een regenton voorkomt dat water al tijdens een bui
                            afstroomt.
                            Zo wordt de piekbelasting afgezwakt. Ook de
                            berging van een vijver of een zwembad kun je hier
                            invullen.
                          <br/>
                          <a
                            target='_blank'
                            href='https://www.rainproof.nl/toolbox/maatregelen/regenton'>
                            <button
                              className='btn btn-xs btn-success'>
                              <i
                                className='fa fa-lightbulb-o' />&nbsp;Tip
                            </button>
                          </a>
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <div className='input-group'>
              <input
                ref='regenton'
                type='number'
                min='0'
                className='form-control'
                id='regenton'
                onChange={this.handleChange}
                value={
                  (calculator.calculationvalues) ?
                  Math.round(calculator.calculationvalues.regenton) :
                  Math.round(calculationvalues.regenton)
                }
              />
              <div className='input-group-addon'>L</div>
              </div>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='' className='col-sm-5 form-control-label'>
              Geveltuin&nbsp;
            <OverlayTrigger
              trigger={'click'}
              rootClose
              placement='top'
              overlay={<Popover
                        id='helptext-geveltuin'
                        style={{ zIndex: 99999999 }}
                        title='Geveltuin'>
                        <strong>Heeft u een geveltuin?</strong>
                        Door een rij tegels te verwijderen langs de gevel aan
                        de straatkant en een tuintje aan te leggen, kan het van
                        de gevel afstromende regenwater in de grond infiltreren.
                        <br/>
                        <a
                          target='_blank'
                          href='https://www.rainproof.nl/toolbox/maatregelen/geveltuintje'>
                          <button
                            className='btn btn-xs btn-success'>
                            <i className='fa fa-lightbulb-o' />&nbsp;Tip
                          </button>
                        </a>
                       </Popover>}>
                       <i
                        className='fa fa-question-circle'
                        style={{ color: '#337AB7' }} />
            </OverlayTrigger>
            </label>
            <div className='col-sm-5'>
              <select
                className='form-control'
                ref='geveltuin'
                onChange={this.handleChange}
                value={
                  (calculator.calculationvalues) ?
                  calculator.calculationvalues.geveltuin :
                  calculationvalues.geveltuin
                }>
                <option value='' />
                <option value='Ja'>Ja</option>
                <option value='Nee'>Nee</option>
              </select>
            </div>
          </div>
        </Col>
        <Col md={6}>
            <h2 className={styles.GroupLabel}>Mijn waterlabel</h2>
            <hr/>
              <span
                className=''
                style={{
                  position: 'absolute',
                  left: 170,
                  fontSize: '5em',
                  fontWeight: 'bold',
                }}>{calculator.label}
              </span>
              <ol className={styles.labels}>
                <li>
                  <svg className={styles.labelA} width='108.5' height='17'>
                    <polygon points='0,0 100,0 108.5,8.5 100,17 0,17' />
                    <text
                      style={{ 'fill': 'white' }}
                      x='2'
                      y='13'>A
                    </text>
                  </svg>
                  {(calculator.label === 'A') ?
                  <svg className={styles.labelA} width='48.5' height='17'>
                    <text
                      style={{ 'fill': 'black' }}
                      x='10'
                      y='13'>&larr;
                    </text>
                  </svg> : ''}
                </li>
                <li>
                  <svg className={styles.labelB} width='98.5' height='17'>
                    <polygon
                      points='0,0 90,0 98.5,8.5 90,17 0,17' />
                    <text
                      style={{ 'fill': 'white' }}
                      x='2'
                      y='13'>B
                    </text>
                  </svg>
                  {(calculator.label === 'B') ?
                  <svg className={styles.labelB} width='48.5' height='17'>
                    <text
                      style={{ 'fill': 'black' }}
                      x='10'
                      y='13'>&larr;
                    </text>
                  </svg> : ''}
                </li>
                <li>
                  <svg className={styles.labelC} width='88.5' height='17'>
                    <polygon
                      points='0,0 80,0 88.5,8.5 80,17 0,17' />
                    <text
                      style={{ 'fill': 'white' }}
                      x='2'
                      y='13'>C
                    </text>
                  </svg>
                  {(calculator.label === 'C') ?
                  <svg className={styles.labelC} width='48.5' height='17'>
                    <text
                      style={{ 'fill': 'black' }}
                      x='10'
                      y='13'>&larr;
                    </text>
                  </svg> : ''}
                </li>
                <li>
                  <svg className={styles.labelD} width='78.5' height='17'>
                    <polygon
                      points='0,0 70,0 78.5,8.5 70,17 0,17' />
                    <text
                      style={{ 'fill': 'white' }}
                      x='2'
                      y='13'>D
                    </text>
                  </svg>
                  {(calculator.label === 'D') ?
                  <svg className={styles.labelD} width='48.5' height='17'>
                    <text
                      style={{ 'fill': 'black' }}
                      x='10'
                      y='13'>&larr;
                    </text>
                  </svg> : ''}
                </li>
                <li>
                  <svg className={styles.labelE} width='68.5' height='17'>
                    <polygon
                      points='0,0 60,0 68.5,8.5 60,17 0,17' />
                    <text
                      style={{ 'fill': 'white' }}
                      x='2'
                      y='13'>E</text>
                  </svg>
                  {(calculator.label === 'E') ?
                  <svg className={styles.labelE} width='48.5' height='17'>
                    <text
                      style={{ 'fill': 'black' }}
                      x='10'
                      y='13'>&larr;
                    </text>
                  </svg> : ''}
                </li>
                <li>
                  <svg className={styles.labelF} width='58.5' height='17'>
                    <polygon
                      points='0,0 50,0 58.5,8.5 50,17 0,17' />
                    <text
                      style={{ 'fill': 'white' }}
                      x='2'
                      y='13'>F
                    </text>
                  </svg>
                  {(calculator.label === 'F') ?
                  <svg className={styles.labelF} width='48.5' height='17'>
                    <text
                      style={{ 'fill': 'black' }}
                      x='10'
                      y='13'>&larr;
                    </text>
                  </svg> : ''}
                </li>
                <li>
                  <svg className={styles.labelG} width='48.5' height='17'>
                    <polygon
                      points='0,0 40,0 48.5,8.5 40,17 0,17' />
                    <text style={{ 'fill': 'white' }} x='2' y='13'>
                    G
                    </text>
                  </svg>
                  {(calculator.label === 'G') ?
                  <svg className={styles.labelG} width='48.5' height='17'>
                    <text
                      style={{ 'fill': 'black' }} x='10' y='13'>&larr;
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
                    url='/media/waterlabel/{z}/{x}/{y}.png'
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

                <h2 className={styles.GroupLabel}>Opslaan</h2>
                <hr/>
                <div className='form-horizontal'>
                  <div className='form-group'>
                    <div className='col-sm-10'>
                      <div className='checkbox'>
                        <label>
                          <input
                            ref='isOwner'
                            onChange={this.handleIsOwner}
                            type='checkbox'/> Dit is mijn huis / ik woon hier
                        </label>
                      </div>
                    </div>
                  </div>
                  {(this.state.isOwner) ?
                  <div className='form-group'>
                    <div className='col-sm-10'>
                      <input
                        type='email'
                        ref='email'
                        className='form-control'
                        id='inputEmail'
                        placeholder='Jouw e-mailadres'
                      />
                      <span
                        id='helpBlock'
                        className='help-block'
                        style={{ fontSize: '.85em' }}>
                        We hebben je e-mailadres alleen nodig ter controle
                      </span>
                      <Button
                        bsSize='lg'
                        bsStyle='info'
                        onClick={this.handleSubmitNewLabel}>
                        Nieuw label opslaan
                      </Button>
                    </div>
                  </div>
                  :
                  <Button bsSize='lg' bsStyle='info' disabled>
                    Nieuw label opslaan
                  </Button>}
                </div>
        </Col>
      </Row>
      </Grid>
    );
  }
}


Calculator.propTypes = {
  calculator: PropTypes.any,
  dispatch: PropTypes.func,
  postcode: PropTypes.any,
};

export default Calculator;

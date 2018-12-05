import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import appStyles from './App.css';
import { connect } from 'react-redux';
import styles from './App.css';
import LabelSymbol from './LabelSymbol';
import AddressSmall from './AddressSmall';
import moment from 'moment';

import {
  setGuiEdit,
  setTab,
  setAbout,
  setPrivacy,
} from '../actions_gui_state';

import {
  requestBuildings,
  receiveBuildings,
  dismissNoBuildingsFound,
  selectAddressFromResults,
  resetAddressQuery,
  resetSelectedAddress,
} from '../actions_address_search_results';
import {
  // FETCH_WATERLABELS,
  sendWaterlabel,
} from '../actions_assets_water_label';

import {
  joinAssetWithAssetType,
  assetDataToAssetPost,
} from './AssetConversions';

import algemeen02 from '../images/algemeen02.png';

class SelectedAddress extends Component {

  render () {
    const { dispatch } = this.props;
    const waterlabel = this.props.assetsWaterlabel.waterLabelsFromServer[0];
    const waterLabelDateObj = waterlabel &&  moment (waterlabel.timestamp + 'Z');
    moment.locale('nl');
    // const waterLabelDateStr = waterLabelDateObj &&  waterLabelDateObj.format('LLLL');
    const waterLabelDateStr = waterLabelDateObj &&  waterLabelDateObj.format('D-M-YYYY');

    return (
      <div className={"form-group " +  styles.FoundAddress} >
      <Row style={{marginTop: "10px"}}>
        <AddressSmall/>
        {
          waterlabel 
          ?
          <LabelSymbol labelObj={this.props.assetsWaterlabel.waterLabelsFromServer[0]}/>
          :
          ""
        }
      </Row>
      <Row>
        <Col md={12}>
          {
            waterlabel 
            ?
            <div>
              {/* <Row style={{display: "flex"}}>
                <Col md={3} sd={6} xs={6}>
                  <span style={{fontWeight: "normal"}}>Uw adres heeft waterlabel:</span>
                </Col>
                <Col  md={6} sd={6} xs={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    // textAlign: "center",
                  }}
                >
                  <b>{waterlabel.code}</b>
                </Col>
              </Row>
              <br/> */}
              <Row>
                <Col  md={3} sd={6} xs={6}>
                  <span style={{fontWeight: "normal"}}>Gewijzigd op</span>
                </Col>
                <Col  md={6} sd={6} xs={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    // textAlign: "center",
                  }}
                >
                  <b>{waterLabelDateStr}</b>
                </Col>
              </Row> 
              {/* <br/>             
              <span style={{fontWeight: "normal"}}>Ga naar "Mijn gegevens" voor meer details.</span> */}
            </div>
            :
            <p>
              Uw adres heeft nog geen waterlabel. 
              {/* Ga naar "Mijn gegevens" om uw waterlabel te berekenen.  */}
            </p>
          }
        </Col>     
      </Row>
      
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    choropleth: state.choropleth,
    postcode: state.postcode,
    calculator: state.calculator.present,
    assetTypes: state.assetTypes,
    addressSearchTerms: state.addressSearchTerms,
    addressSearchResults: state.addressSearchResults,
    assetsWaterlabel: state.assetsWaterlabel,
    guiState: state.guiState,
  };
}

export default connect(mapStateToProps)(SelectedAddress);
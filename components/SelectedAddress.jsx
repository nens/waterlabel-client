import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import appStyles from './App.css';
import { connect } from 'react-redux';
import styles from './App.css';
import LabelSymbol from './LabelSymbol';

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

class SelectedAddress extends Component {

  


  render () {
    const { dispatch } = this.props;
    const waterlabel = this.props.assetsWaterlabel.waterLabelsFromServer[0];
    return (
      <div className={"form-group " +  styles.FoundAddress} >
      <Row style={{marginTop: "10px"}}>
        <Col md={6} sm={12} xs={12} >
          <Row>
            <Col md={12}>
                <span>{this.props.addressSearchResults.selectedResult.street+
                  ' '+ this.props.addressSearchResults.selectedResult.housenumber+
                  ' '+ (this.props.addressSearchResults.selectedResult.houseletter || '')}</span>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
                <span>{this.props.addressSearchResults.selectedResult.postalcode}</span>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
                <span>{this.props.addressSearchResults.selectedResult.city}</span>
            </Col>
          </Row>
          <br/>
        </Col>
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
            <p>
              Uw adres heeft waterlabel: {waterlabel.code}.
              <br/>
              Ga naar "Mijn gegevens" voor meer details.
            </p>
            :
            <p>
              Uw adres heeft nog geen waterlabel. 
              Ga naar "Mijn gegevens" om uw waterlabel te berekenen. 
            </p>
          }
        </Col>     
      </Row>
      <Row style={{marginTop: 10 }}>
        <Col md={6} sm={12} xs={12}>
          <div className='form-group'>
            {/* <ButtonGroup style={{ marginTop: 10 }}> */}
              <Button
                style={{ width:'100%'}}
                // disabled={(postcode.isFetching) ? true : false}
                bsStyle='info'
                onClick={() => 
                  {
                    // this.setState({editMode:false})
                    dispatch(setGuiEdit(false));
                    // dispatch(clearSelectedObject())}
                    dispatch(resetAddressQuery())
                  }
                  }
                bsSize='lg'>
                <i className='fa fa-edit' />&nbsp; Ander adres
              </Button>
            {/* </ButtonGroup> */}
          </div>
        </Col>
        {
          // ! this.state.editMode
          ! this.props.guiState.edit 
          ?
          <div>
          
          <Col md={6} sm={12} xs={12} >
            <div className='form-group'>
                <Button
                  style={{width:'100%'}}
                  // disabled={(postcode.isFetching) ? true : false}
                  bsStyle='info'
                  // onClick={() => this.setState({editMode:false})}
                  bsSize='lg'>
                  <i className='fa fa-print' />&nbsp;Label Afdrukken
                </Button>
              {/* </ButtonGroup> */}
            </div>
          </Col>
          <Col md={6} sm={12} xs={12} >
            <div className='form-group'>
              {/* <ButtonGroup> */}
                <Button
                  style={{width:'100%'}}
                  // disabled={(postcode.isFetching) ? true : false}
                  bsStyle='info'
                  onClick={() => {
                    // this.setState({editMode:true})
                    dispatch(setGuiEdit(true));
                  }}
                  bsSize='lg'>
                  <i className='fa fa-edit' />&nbsp; Mijn gegevens aanpassen
                </Button>
              {/* </ButtonGroup> */}
            </div>
          </Col>
          </div>
          :
          <Col md={6} sm={12} xs={12} >
            <div className='form-group'>
              {/* <ButtonGroup style={{ marginTop: 10 }}> */}
                <Button
                  style={{width:'100%'}}
                  // disabled={(postcode.isFetching) ? true : false}
                  bsStyle='info'
                  onClick={() => {
                    // this.setState({editMode:false})
                    dispatch(setGuiEdit(false));
                    dispatch(sendWaterlabel(({
                      building: this.props.addressSearchResults.selectedResult.building,
                      email: 'tom.deboer@nelen-schuurmans.nl',
                      assets: this.props.assetsWaterlabel.assetsToAdapt.map(e=>assetDataToAssetPost(e, this.props.assetTypes.assets)),
                    })));
                  }}
                  bsSize='lg'>
                  <i className='fa fa-save' />
                  &nbsp; Mijn Gegevens Opslaan
                </Button>
              {/* </ButtonGroup> */}
            </div>
          </Col>
          }
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
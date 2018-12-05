import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import styles from './App.css';


class AddressSmall extends Component {

  


  render () {
    const { dispatch } = this.props;

    return (
      <Col md={6} sm={12} xs={12} className={styles.FoundAddress} >
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

export default connect(mapStateToProps)(AddressSmall);
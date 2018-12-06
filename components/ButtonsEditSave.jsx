import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import styles from './App.css';


  import {
    setGuiEdit,
    setTab,
    setAbout,
    setPrivacy,
    setShowOtherLabels,
  } from '../actions_gui_state';
  import {
    // FETCH_WATERLABELS,
    sendWaterlabel,
    adaptWaterlabel,
  } from '../actions_assets_water_label';

class ButtonsEditSave extends Component {

  


  render () {
    const { dispatch } = this.props;

    return (
      <Row style={{marginTop: 10 }}>
        {/* <Col md={6} sm={12} xs={12}>
          <div className='form-group'>
              <Button
                style={{ width:'100%'}}
                bsStyle='info'
                onClick={() => 
                  {
                    dispatch(setGuiEdit(false));
                    dispatch(resetAddressQuery())
                  }
                  }
                bsSize='lg'>
                <i className='fa fa-edit' />&nbsp; Ander adres
              </Button>
          </div>
        </Col> */}
        {
          ! this.props.guiState.edit          
          ?
          <div>
          
          <Col md={12}>
          <Row>
          <Col md={6} sm={12} xs={12} >
            <div className='form-group'>
              {/* <ButtonGroup> */}
                <Button
                  bsStyle='info'
                  onClick={() => {
                    // this.setState({editMode:true})
                    dispatch(setGuiEdit(true));
                  }}
                  bsSize='lg'
                  className={styles.ButtonWidth}
                  >
                  <i className='fa fa-edit' />
                  &nbsp; {this.props.assetsWaterlabel.currentLabel ?
                    "Wijzig"
                    :
                    "Nieuw Label"
                  }
                </Button>
              {/* </ButtonGroup> */}
            </div>
          </Col>
          </Row>
          {this.props.assetsWaterlabel.currentLabel ?
          <Row>
          <Col md={6} sm={12} xs={12} >
            <div className='form-group'>
                <Button
                  bsStyle='info'
                  // onClick={() => this.setState({editMode:false})}
                  bsSize='lg'
                  className={styles.ButtonWidth}
                  >
                  <i className='fa fa-print' />&nbsp;Print
                </Button>
              {/* </ButtonGroup> */}
            </div>
          </Col>
          </Row>
          :
          ""
          }
          <Row>
          <Col md={6} sm={12} xs={12} >
            <div className='form-group'>
                <Button
                  bsStyle='info'
                  onClick={() => this.props.dispatch(setShowOtherLabels(true))}
                  bsSize='lg'
                  className={styles.ButtonWidth}
                >
                  <i className='fa fa-tags' />&nbsp;Andere Labels
                </Button>
              {/* </ButtonGroup> */}
            </div>
          </Col>
          </Row>
          </Col>
          </div>
          
          :
          // <Col md={6} sm={12} xs={12} >
          //   <div className='form-group'>
          //     {/* <ButtonGroup style={{ marginTop: 10 }}> */}
          //       <Button
          //         style={{width:'100%'}}
          //         // disabled={(postcode.isFetching) ? true : false}
          //         bsStyle='info'
          //         onClick={() => {
          //           // this.setState({editMode:false})
          //           dispatch(setGuiEdit(false));
          //           dispatch(sendWaterlabel(({
          //             building: this.props.addressSearchResults.selectedResult.building,
          //             email: 'tom.deboer@nelen-schuurmans.nl',
          //             assets: this.props.assetsWaterlabel.assetsToAdapt.map(e=>assetDataToAssetPost(e, this.props.assetTypes.assets)),
          //           })));
          //         }}
          //         bsSize='lg'>
          //         <i className='fa fa-save' />
          //         &nbsp; Opslaan
          //       </Button>
          //     {/* </ButtonGroup> */}
          //   </div>
          // </Col>
          ""
          }
          </Row>
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

export default connect(mapStateToProps)(ButtonsEditSave);
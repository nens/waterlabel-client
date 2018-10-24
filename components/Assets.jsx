import React, { Component, PropTypes } from 'react';
import styles from './Assets.css';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import appStyles from './App.css'

class Assets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      assets: [
        {
          type: 'groen dak',
          area: 10,
          storage: 100,
          drainage: 'riool'
        }
      ],
      kadasterArea: 100,
      bagArea: 40,
    };
  }

  drawRows (rows) {
    return rows.map((e,i)=> {
      return (
        // <div key={e.type + ' ' + e.area + ' ' + e.storage + ' ' + e.drainage}>
        <div key={i}>
          <Row>
            <Col md={3} sm={3} xs={3}>
              <span>{e.type}</span>
            </Col>
            <Col md={3} sm={3} xs={3}>
              <span>{e.area}</span>
            </Col>
            <Col md={3} sm={3} xs={3}>
              <span>{e.storage}</span>
            </Col>
            <Col md={3} sm={3} xs={3}>
              <span>{e.drainage}</span>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <hr style={{marginTop: '5px'}} className={appStyles.SeperatorAddress}/>
            </Col>
          </Row>
        </div>
      );
    })
  }

  render() {

    const totalArea = this.state.assets.reduce((acc,e) =>  acc + e.area, 0);
    console.log('totalArea',totalArea);

    return (
        <div className={"form-group " + styles.AssetsReadOnly}style={{marginTop: '24px'}}>
          <Row>
            <Col md={3} sm={3} xs={3}>
              <span style={{fontWeight: 'bold'}}>Type</span>
            </Col>
            <Col md={3} sm={3} xs={3}>
              <span style={{fontWeight: 'bold'}}>Oppervlak m2</span>
            </Col>
            <Col md={3} sm={3} xs={3}>
              <span style={{fontWeight: 'bold'}}>Berging mm</span>
            </Col>
            <Col md={3} sm={3} xs={3}>
              <span style={{fontWeight: 'bold'}}>Afvoer naar</span>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <hr style={{marginTop: '5px'}} className={appStyles.SeperatorAddress}/>
            </Col>
          </Row>
          {this.drawRows(this.state.assets)}
          <Row>
            <Col md={6} sm={6} xs={6}>
              <Row>
                <Col md={6} sm={6} xs={6}>
                  <span style={{fontWeight: 'bold'}}>Totaal Oppervlak:</span>
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <span style={{fontWeight: 'bold'}}>{totalArea}</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      
    );
  }
}

export default Assets;

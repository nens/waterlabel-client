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
      editMode: false,
    };
  }

  drawNonEditColumns(e) {
    return (
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
    );
  }
  drawEditColumns(e, i) {
    return (
      <Row>
        <Col md={3} sm={3} xs={3}>
          <input 
            value={e.type} 
            className="form-control"
            onChange={(e) => {
              let tmpAssets = this.state.assets;
              tmpAssets[i].type = e.value;
              this.setState({assets: tmpAssets})
            }}
          />
        </Col>
        <Col md={3} sm={3} xs={3}>
        <input 
          value={e.area} 
          className="form-control"
          onChange={(e) => {
            let tmpAssets = this.state.assets;
            tmpAssets[i].type = e.area;
            this.setState({assets: tmpAssets})
          }}
        />
        </Col>
        <Col md={3} sm={3} xs={3}>
        <input 
          value={e.storage} 
          className="form-control"
          onChange={(e) => {
            let tmpAssets = this.state.assets;
            tmpAssets[i].type = e.storage;
            this.setState({assets: tmpAssets})
          }}
        />
        </Col>
        <Col md={2} sm={2} xs={2}>
        <input 
          value={e.drainage} 
          className="form-control"
          onChange={(e) => {
            let tmpAssets = this.state.assets;
            tmpAssets[i].type = e.drainage;
            this.setState({assets: tmpAssets})
          }}
        />
        </Col>
        <Col md={1} sm={1} xs={1}>
          <button 
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderStyle: 'none',
              color: 'pink',
              fontWeight: 'bold',
              fontSize: 'larger'  
            }}
            title="Verwijder Item"
            onClick={()=>{
              let tmpAssets = this.state.assets;
              tmpAssets.splice(i, 1);
              this.setState({assets: tmpAssets})

            }}
          >
          x
          </button>
        </Col>
      </Row>
    );
  }

  drawRows (rows) {
    return rows.map((e,i)=> {
      return (
        // <div key={e.type + ' ' + e.area + ' ' + e.storage + ' ' + e.drainage}>
        <div key={i}>
          
          {
            this.state.editMode 
            ?
            this.drawEditColumns(e, i)
            :
            this.drawNonEditColumns(e)
          }
          <Row>
            <Col md={12}>
              <hr style={{margin: '5px'}} className={appStyles.SeperatorAddress}/>
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
              <hr style={{margin: '5px'}} className={appStyles.SeperatorAddress}/>
            </Col>
          </Row>
          {this.drawRows(this.state.assets)}
          {
            this.state.editMode 
            ?
            <Row>
              <Col md={12}>
                <button
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderRadius: '4px',
                    fontSize: 'larger',
                    fontWeight: 'bold',
                  }}
                  onClick={()=>{
                    let tmpAssets = this.state.assets;
                    tmpAssets.push({
                      type: 'select type',
                      area: 0,
                      storage: 0,
                      drainage: 'riool'
                    });
                    this.setState({assets: tmpAssets})
                  }}
                >
                  + Voeg Dak toe
                </button>
              </Col>
            </Row>
            :
            ''
          }
          <Row style={{marginTop:'10px'}}>
            <Col md={6} sm={6} xs={6}>
              <Row>
                <Col md={12} sm={12} xs={12}>
                  <span style={{fontWeight: 'bold'}}>Totaal Oppervlak: {totalArea} m2</span>
                </Col>
                {/* <Col md={6} sm={6} xs={6}>
                  <span style={{fontWeight: 'bold'}}>{totalArea}</span>
                </Col> */}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12} xs={12} >
              <div className='form-group'>
                <ButtonGroup style={{ marginTop: 10 }}>
                  <Button
                    // disabled={(postcode.isFetching) ? true : false}
                    bsStyle='info'
                    onClick={() => this.setState({editMode:true})}
                    bsSize='lg'>
                    <i className='fa fa-edit' />&nbsp; Wijzig Gegevens
                  </Button>
                </ButtonGroup>
              </div>
            </Col>
          </Row>
        </div>
      
    );
  }
}

export default Assets;

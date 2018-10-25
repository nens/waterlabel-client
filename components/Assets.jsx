import React, { Component, PropTypes } from 'react';
import styles from './Assets.css';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import appStyles from './App.css'
import CustomSelect from './CustomSelect.css'

class Assets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rootTypes : [
        {type: 'Normaal verhard dak (0 mm)', storage: 0 }, 
        {type: 'Vegetatiedak, kleine dikte (3 mm)', storage: 3 },
        {type: 'Vegetatiedak, kleine dikte (5 mm)', storage: 5 },
        {type: 'Vegetatiedak, normale dikte (8 mm)', storage: 8 },
        {type: 'Vegetatiedak, grote dikte (12,5 mm)', storage: 12.5 },
        {type: 'Vegetatiedak, extra grote dikte (17,5 mm)', storage: 17.5 },
        {type: 'Tuindak, kleine dikte (10 mm)', storage: 10 },
        {type: 'Tuindak, grote dikte (37,5 mm)', storage: 37.5 },
        {type: 'Tuindak, extra grote dikte (50 mm)', storage: 50 },
        {type: 'Polderdak (30 mm)', storage: 30 },
      ],
      assets: [
        {
          category: 'daken',
          type: 'Normaal verhard dak (0 mm)',
          area: 10,
          storage: 100,
          drainage: 'riool'
        },
        {
          category: 'terrein',
          type: 'klinkers',
          area: 10,
          storage: 100,
          drainage: 'riool'
        },
        {
          category: 'extra',
          type: 'regenton',
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

  

  drawRows (rows) {
    return rows.map((e,i)=> {
      console.log(this.props.selectedTab, e.category);
      if (this.props.selectedTab !== e.category) {
        return '';
      }
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
          <select 
            value={e.type} 
            className="form-control"
            onChange={(e) => {
              const defaultStorage = this.state.rootTypes.find(
                item => item.type === e.target.value   
              ).storage; 

              let tmpAssets = this.state.assets;
              tmpAssets[i].type = e.target.value;
              console.log(defaultStorage);
              tmpAssets[i].storage = defaultStorage;
              this.setState({assets: tmpAssets})
            }}
          >
            {this.state.rootTypes.map(
              (e)=>{
                return <option value={e.type}>{e.type}</option>
              }
            )}
          </select>
        </Col>
        <Col md={3} sm={3} xs={3}>
        <input 
          value={e.area} 
          className="form-control"
          onChange={(e) => {
            let tmpAssets = this.state.assets;
            tmpAssets[i].area = parseInt(e.target.value) || '';
            this.setState({assets: tmpAssets})
          }}
        />
        </Col>
        <Col md={3} sm={3} xs={3}>
        <input 
          value={e.storage} 
          className="form-control"
          onChange={(e) => {
            if (
              RegExp('^[1-9][0-9]*([,|.])?[0-9]?$').test(e.target.value)
              || e.target.value == ''  
            ) 
            {
              let tmpAssets = this.state.assets;
              tmpAssets[i].storage = e.target.value;
              this.setState({assets : tmpAssets})
            }
          }}
        />
        </Col>
        <Col md={2} sm={2} xs={2}>
        <div className={CustomSelect.Container}>
        <select 
          value={e.drainage} 
          className="form-control"
          onChange={(e) => {
            let tmpAssets = this.state.assets;
            tmpAssets[i].drainage = e.target.value;
            this.setState({assets: tmpAssets})
          }}
        >
          <option value="riool">riool</option>
          <option value="riool">tuin</option>
        </select>
        </div>
        </Col>
        <Col md={1} sm={1} xs={1}>
          <button 
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderStyle: 'none',
              color: 'white',
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

  render() {

    const totalArea = this.state.assets.reduce((acc,e) =>  acc + (e.area || 0), 0);
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
                      category: this.props.selectedTab,
                      type: 'select type',
                      area: 0,
                      storage: 0,
                      drainage: 'riool'
                    });
                    this.setState({assets: tmpAssets})
                  }}
                >
                  + Nieuw Item
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
          {
            !this.state.editMode 
            ?
          <Row>
            <Col md={12} sm={12} xs={12} >
              <div className='form-group'>
                {/* <ButtonGroup style={{ marginTop: 10 }}> */}
                  <Button
                    style={{width:'100%',marginTop: 10}}
                    // disabled={(postcode.isFetching) ? true : false}
                    bsStyle='info'
                    onClick={() => this.setState({editMode:true})}
                    bsSize='lg'>
                    <i className='fa fa-edit' />&nbsp; Wijzig Gegevens
                  </Button>
                {/* </ButtonGroup> */}
              </div>
            </Col>
            <Col md={12} sm={12} xs={12} >
              <div className='form-group'>
                {/* <ButtonGroup style={{ marginTop: 10 }}> */}
                  <Button
                    style={{width:'100%',marginTop: 10}}
                    // disabled={(postcode.isFetching) ? true : false}
                    bsStyle='info'
                    // onClick={() => this.setState({editMode:false})}
                    bsSize='lg'>
                    <i className='fa fa-print' />&nbsp;Waterlabel Afdrukken
                  </Button>
                {/* </ButtonGroup> */}
              </div>
            </Col>
          </Row>
          :
          <Row>
            <Col md={12} sm={12} xs={12} >
              <div className='form-group'>
                {/* <ButtonGroup style={{ marginTop: 10 }}> */}
                  <Button
                    style={{width:'100%',marginTop: 10}}
                    // disabled={(postcode.isFetching) ? true : false}
                    bsStyle='info'
                    onClick={() => this.setState({editMode:false})}
                    bsSize='lg'>
                    <i className='fa fa-save' />&nbsp; Opslaan
                  </Button>
                {/* </ButtonGroup> */}
              </div>
            </Col>
            
          </Row>
          }
        </div>
      
    );
  }
}

export default Assets;

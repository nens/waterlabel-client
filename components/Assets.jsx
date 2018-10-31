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
      terrainTypes : [
        {type: 'Normaal verhard dak (0 mm)', storage: 0 , infiltration: 0 }, 
        {type: 'Vegetatiedak, kleine dikte (3 mm)', storage: 3 , infiltration: 0 },
        {type: 'Vegetatiedak, kleine dikte (5 mm)', storage: 5 , infiltration: 0 },
        {type: 'Vegetatiedak, normale dikte (8 mm)', storage: 8 , infiltration: 0 },
        {type: 'Vegetatiedak, grote dikte (12,5 mm)', storage: 12.5 , infiltration: 0 },
        {type: 'Vegetatiedak, extra grote dikte (17,5 mm)', storage: 17.5 , infiltration: 0 },
        {type: 'Tuindak, kleine dikte (10 mm)', storage: 10 , infiltration: 0 },
        {type: 'Tuindak, grote dikte (37,5 mm)', storage: 37.5 , infiltration: 0 },
        {type: 'Tuindak, extra grote dikte (50 mm)', storage: 50 , infiltration: 0 },
        {type: 'Polderdak (30 mm)', storage: 30 , infiltration: 0 },
      ],
      extraTypes: [
        {type: 'Regenton', storage: 200, infiltration: 0 }, 
        {type: 'Infiltratiekrat', storage: 4500 , infiltration: 1000 },
        {type: 'Grindkoffer', storage: 2500 , infiltration: 0 },
        {type: 'Vegetatiedak, normale dikte (8 mm)', storage: 8 , infiltration: 0 },
        {type: 'Vegetatiedak, grote dikte (12,5 mm)', storage: 12.5 , infiltration: 0 },
        {type: 'Vegetatiedak, extra grote dikte (17,5 mm)', storage: 17.5 , infiltration: 0 },
        {type: 'Tuindak, kleine dikte (10 mm)', storage: 10 , infiltration: 0 },
        {type: 'Tuindak, grote dikte (37,5 mm)', storage: 37.5 , infiltration: 0 },
        {type: 'Tuindak, extra grote dikte (50 mm)', storage: 50 , infiltration: 0 },
        {type: 'Polderdak (30 mm)', storage: 30 , infiltration: 0 },
      ],
      assets: [
        {
          category: 'dak',
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
        <Row key={i}>
          <Col md={12}>
            
            {this.drawEditColumn(e, i)}
            <Row>
              <Col md={12}>
                <hr style={{marginTop: '5px', marginBottom: '5px'}}/>
              </Col>
            </Row>
          </Col>
        </Row>
      );
    })
  }


  drawEditColumn(e, i) {
    return (
      <Row>
        <Col md={12}>
          {/* <Row>

          </Row> */}
          <Row>
            <Col md={12} sm={12} xs={12}>
              
            {/* </Col>
            <Col md={1} sm={1} xs={1}> */}
             { this.state.editMode ?
              <button 
                style={{
                  borderStyle: 'none',
                  color: 'red',
                  backgroundColor: 'transparent',
                  fontWeight: 'bold',
                  fontSize: 'larger',
                  float: 'right' 
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
              :
              ''
              }
              <h3 style={{display: 'inline-block', marginTop:'5px'}}>{e.type}</h3>
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12} xs={12}>
              <label >
                Oppervlakte (m<sup>2</sup>): 
              </label>
            </Col>
              
            <Col md={4} sm={12} xs={12}>
              <input 
                value={e.area} 
                className="form-control"
                onChange={(e) => {
                  let tmpAssets = this.state.assets;
                  tmpAssets[i].area = parseInt(e.target.value) || '';
                  this.setState({assets: tmpAssets})
                }}
                readOnly={!this.state.editMode}
                disabled={!this.state.editMode}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12} xs={12}>
              <label>
                Berging (mm): 
              </label>
            </Col>
            <Col md={4} sm={12} xs={12}>
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
              readOnly={!this.state.editMode}
              disabled={!this.state.editMode}
            />
            </Col>
          </Row>

          <Row>
            <Col md={4} sm={12} xs={12}>
              <label>
                Afvoer naar: 
              </label>
            </Col>
            <Col md={4} sm={12} xs={12}>
              <div className={CustomSelect.Container}>
                <select 
                  value={e.drainage} 
                  className={"form-control"+" "+styles.AssetsReadOnly}
                  onChange={(e) => {
                    let tmpAssets = this.state.assets;
                    tmpAssets[i].drainage = e.target.value;
                    this.setState({assets: tmpAssets})
                  }}
                  readOnly={!this.state.editMode}
                  disabled={!this.state.editMode}
                >
                  <option value="riool">riool</option>
                  <option value="riool">tuin</option>
                </select>
              </div>
            </Col>
            
          </Row>
        </Col>
      </Row>
    );
  }

  render() {

    const totalArea = this.state.assets.filter(e=>e.category===this.props.selectedTab).reduce((acc,e) =>  acc + (e.area || 0), 0);
    console.log('totalArea',totalArea);

    return (
        <div className={"form-group " + styles.Assets}style={{marginTop: '24px'}}>
          {
            this.state.editMode 
            ?
            <Row>
              <Col md={6} SM={12} XS={12}>
                <select 
                  value={""} 
                  className="form-control"
                  onChange={(e)=>{
                    let tmpAssets = this.state.assets;
                    tmpAssets.unshift({
                      category: this.props.selectedTab,
                      type: e.target.value,
                      area: 0,
                      storage: 0,
                      drainage: 'riool'
                    });
                    this.setState({assets: tmpAssets})
                  }}
                >
                  <option value="" disabled >+ Voeg Toe</option>
                  {this.state.rootTypes.map(
                    (e)=>{
                      return <option value={e.type}>{e.type}</option>
                    }
                  )}
                </select>
              </Col>
            </Row>
            :
            ''
          }
          { this.props.selectedTab === 'dak'?
            <Row>
            <Col md={12}>
              <h3>Opgegeven daken:</h3>
            </Col>
            </Row>
            :
            this.props.selectedTab === 'terrein'?
            <Row>
            <Col md={12}>
              <h3>Opgegeven terrein:</h3>
            </Col>
            </Row>
            :
            <Row>
            <Col md={12}>
              <h3>Opgegeven extra items:</h3>
            </Col>
            </Row>
          }
          
          <Row>
            <Col md={12}>
              <hr style={{marginTop: '5px', marginBottom: '5px'}}/>
            </Col>
          </Row>
          {this.drawRows(this.state.assets)}
          
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
            <Col md={6} sm={12} xs={12} >
              <div className='form-group'>
                {/* <ButtonGroup style={{ marginTop: 10 }}> */}
                  <Button
                    style={{width:'100%',marginTop: 10}}
                    // disabled={(postcode.isFetching) ? true : false}
                    bsStyle='info'
                    onClick={() => this.setState({editMode:true})}
                    bsSize='lg'>
                    <i className='fa fa-edit' />&nbsp; Mijn gegevens aanpassen
                  </Button>
                {/* </ButtonGroup> */}
              </div>
            </Col>
            <Col md={6} sm={12} xs={12} >
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
            <Col md={6} sm={12} xs={12} >
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

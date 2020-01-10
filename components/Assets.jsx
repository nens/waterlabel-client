import React, { Component, PropTypes } from 'react';
import styles from './Assets.css';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import appStyles from './App.css'
import CustomSelect from './CustomSelect.css'

const ANDERS_NAMELIJK = 'Anders namelijk .. ' 

class Assets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      assets: [
        {
          category: 'dak',
          type: 'Normaal verhard dak (0 mm)',
          area: 10,
          storage: 100,
          drainage: 'tuin'
        },
        {
          category: 'terrein',
          type: 'klinkers',
          area: 10,
          storage: 100,
          infiltration: 100,
          drainage: 'riool'
        },
        {
          category: 'extra',
          type: 'regenton',
          storage: 100,
          infiltration: 100,
          mm: 10,
          drainage: 'riool'
        }
      ],
      kadasterArea: 100,
      bagArea: 40,
      editMode: false,
    };
  }

  selectedTabToCategory(selectedTab) {
    if (selectedTab==='dak')     return 'Dak';
    if (selectedTab==='terrein') return 'Tuin';
                                 return 'Voorziening'
  }

  findAssetType(name, category) {
    return this.props.assetTypes.filter(e=>e.name===name && e.category===category)[0];
  }

  

  drawRows (rows) {
    return rows.map((e,i)=> {
      console.log(this.props.selectedTab, e.category);
      if (this.selectedTabToCategory(this.props.selectedTab) !== e.category) {
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

  createCardBody(e,i) {
    if (this.props.selectedTab==='dak') {
      return (
        <div>
        { e.name==='Voeg nieuw type toe' ? this.createFreeTextRow(e,i):''}
        { this.createAreaRow(e,i) }
        { this.createStorageRow( e,i)}
        { this.createDrainageRow( e,i)}
        </div>
      );
    } else if (this.props.selectedTab==='terrein') {
      return (
      <div>
      { e.name=== ANDERS_NAMELIJK ? this.createFreeTextRow(e,i):''}
      { this.createAreaRow(e,i) }
      { this.createInfiltrationRow(e,i)}
      { this.createStorageRow( e,i)}
      </div>
      )
    } else { // selectedTab === extra
      return (
      <div>
      { e.name=== ANDERS_NAMELIJK ? this.createFreeTextRow(e,i):''}
      { this.createInfiltrationRow(e,i)}
      { this.createStorageRow( e,i)}
      </div>
      )
    }
    
  }

  createFreeTextRow (e,i) {
    return (
      <Row>
        <Col md={4} sm={12} xs={12}>
          <label >
            Naam van nieuw type: 
          </label>
        </Col>
          
        <Col md={4} sm={12} xs={12}>
          <input 
            value={e.customName} 
            className="form-control"
            onChange={(e) => {
              let tmpAssets = this.state.assets;
              tmpAssets[i].customName = e.target.value || '';
              this.setState({assets: tmpAssets})
            }}
            readOnly={!this.props.editMode}
            disabled={!this.props.editMode}
            placeholder={"beschrijf hier uw voorziening"}
          />
        </Col>
      </Row>
    );
  }

  createAreaRow (e,i) {
    return (
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
            readOnly={!this.props.editMode}
            disabled={!this.props.editMode}
          />
        </Col>
      </Row>
    );
  }

  createInfiltrationRow (e,i) {
    return (
      <Row>
        <Col md={4} sm={12} xs={12}>
          <label >
            Infiltration (mm): 
          </label>
        </Col>
          
        <Col md={4} sm={12} xs={12}>
          <input 
            value={e.infiltration} 
            className="form-control"
            onChange={(e) => {
              let tmpAssets = this.state.assets;
              tmpAssets[i].infiltration = parseInt(e.target.value) || '';
              this.setState({assets: tmpAssets})
            }}
            readOnly={!this.props.editMode || e.name !== ANDERS_NAMELIJK}
            disabled={!this.props.editMode || e.name !== ANDERS_NAMELIJK}
          />
        </Col>
      </Row>
    );
  }

  createStorageRow (e,i) {
    return (
      <Row>
            <Col md={4} sm={12} xs={12}>
              <label>
                {this.props.selectedTab !== 'extra' ? "Berging (mm)" : "Berging (liter)"}
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
              readOnly={!this.props.editMode || e.name !== ANDERS_NAMELIJK}
              disabled={!this.props.editMode || e.name !== ANDERS_NAMELIJK}
            />
            </Col>
          </Row>
    );
  }

  createDrainageRow (e,i) {
    return (
      <Row>
        <Col md={4} sm={12} xs={12}>
          <label>
            Afvoer naar: 
          </label>
        </Col>
        <Col md={4} sm={12} xs={12}>
          {/* <div className={CustomSelect.Container}>
            <select 
              value={e.drainage} 
              className={"form-control"}
              onChange={(e) => {
                let tmpAssets = this.state.assets;
                tmpAssets[i].drainage = e.target.value;
                this.setState({assets: tmpAssets})
              }}
              readOnly={!this.props.editMode}
              disabled={!this.props.editMode}
            >
              <option value="riool">riool</option>
              <option value="tuin">tuin</option>
            </select>
          </div> */}
            <label className="radio-inline" 
              
            >
              <input type="radio" name={"drainage"+i} value="riool" checked={e.drainage==='riool'}
              onChange={
                (e) => {
                  console.log('riool');
                  let tmpAssets = this.state.assets;
                  tmpAssets[i].drainage = 'riool';
                  this.setState({assets: tmpAssets})
                  console.log(this.state.assets)
                }
              }
              readOnly={!this.props.editMode}
              disabled={!this.props.editMode}
              />
              riool
            </label>
            <label className="radio-inline"
              
            >
              <input type="radio" name={"drainage"+i} value="tuin" checked={e.drainage==='tuin'}
              onChange={
                (e) => {
                  console.log('tuin');
                  let tmpAssets = this.state.assets;
                  tmpAssets[i].drainage = 'tuin';
                  this.setState({assets: tmpAssets})
                }
              }
              readOnly={!this.props.editMode}
              disabled={!this.props.editMode}
              />
              tuin
            </label>
          
        </Col>
      </Row>
    );
  }


  drawEditColumn(e, i) {
    return (
      <Row>
        <Col md={12}>
          <Row>
            <Col md={12} sm={12} xs={12}>
             { this.props.editMode ?
              <button 
                style={{
                  borderStyle: 'none',
                  color: 'red',
                  backgroundColor: 'transparent',
                  fontWeight: 'bold',
                  fontSize: 'large',
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
              <h4 style={{display: 'inline-block', marginTop:'5px'}}>
                {
                e.name==='Voeg nieuw type toe' ? 
                "Nieuw type"
                :
                e.name
                }
              </h4>
              
              
            </Col>
          </Row>
          {/* Should area show -> not for type extra */}
          {this.createCardBody(e,i)}
          {/* { this.props.selectedTab !== 'extra' ? this.createAreaRow(e,i) : '' }
          { this.createInfiltrationRow(e,i) }
          { this.createStorageRow( e,i)}
          { this.createDrainageRow( e,1)} */}

          
        </Col>
      </Row>
    );
  }

  render() {

    const totalArea = this.state.assets.filter(e=>e.category===this.props.selectedTab).reduce((acc,e) =>  acc + (e.area || 0), 0);
    console.log('totalArea',totalArea);

    return (
        <div className={"form-group " + styles.Assets}style={{marginTop: '-4px'}}>
          {
            this.props.editMode 
            ?
            <Row>
              <Col md={6} SM={12} XS={12}>
                <select 
                  value={""} 
                  className="form-control"
                  onChange={(e)=>{
                    let selectedItem;
                    if (e.target.value === ANDERS_NAMELIJK ) {
                      selectedItem = {
                        "name": ANDERS_NAMELIJK,
                        "code": ANDERS_NAMELIJK,
                        "category": this.selectedTabToCategory(this.props.selectedTab),
                        "storage": 0.0,
                        "infiltration": 0.0,
                        "description": ""
                      }
                      console.log('selectedItem', selectedItem, 'anders')
                    } else {
                      selectedItem = this.findAssetType(e.target.value, this.selectedTabToCategory(this.props.selectedTab));
                      console.log('selectedItem', selectedItem);
                    }
                    selectedItem.area = 0;
                    selectedItem.drainage = 'riool';
                    let tmpAssets = this.state.assets;
                    tmpAssets.unshift(selectedItem);
                    this.setState({assets: tmpAssets})
                  }}
                >
                  { this.props.selectedTab==='dak'?
                  <option value="" disabled >{"+ Nieuw Dak"}</option>
                  :
                  this.props.selectedTab==='terrein'?
                  <option value="" disabled >{"+ Nieuw Terrein"}</option>
                  :
                  <option value="" disabled >{"+ Nieuw Extra Item"}</option>
                  }
                  {this.props.assetTypes
                    .filter(e => e.category===this.selectedTabToCategory(this.props.selectedTab))
                    .map(  e => <option value={e.name}>{e.name}</option>)
                  }
                  <option value={ANDERS_NAMELIJK} >{ANDERS_NAMELIJK}</option>
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
          
          {this.props.selectedTab !== 'extra' ?
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
          :
          ''
          }
        </div>
      
    );
  }
}

export default Assets;

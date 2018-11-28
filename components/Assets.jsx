import React, { Component, PropTypes } from 'react';
import styles from './Assets.css';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import appStyles from './App.css'
import CustomSelect from './CustomSelect.css'

const ANDERS_NAMELIJK = 'Anders namelijk .. ' 

class Assets extends Component {

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
      if (this.selectedTabToCategory(this.props.selectedTab) !== e.category) {
        return '';
      }
      return (
        // <div key={e.type + ' ' + e.area + ' ' + e.storage + ' ' + e.sewer_connection}>
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
              let tmpAssets = this.props.assetsToAdapt;
              tmpAssets[i].customName = e.target.value || '';
              this.props.adaptAssets(tmpAssets);
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
              let tmpAssets = this.props.assetsToAdapt;
              tmpAssets[i].area = parseInt(e.target.value) || '';
              this.props.adaptAssets(tmpAssets);
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
            Infiltratie (mm / uur): 
          </label>
        </Col>
          
        <Col md={4} sm={12} xs={12}>
          <input 
            value={e.infiltration} 
            className="form-control"
            onChange={(e) => {
              let tmpAssets = this.props.assetsToAdapt;
              tmpAssets[i].infiltration = parseInt(e.target.value) || '';
              this.props.adaptAssets(tmpAssets);
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
                  let tmpAssets = this.props.assetsToAdapt;
                  tmpAssets[i].storage = e.target.value;
                  this.props.adaptAssets(tmpAssets);
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
              value={e.sewer_connection} 
              className={"form-control"}
              onChange={(e) => {
                let tmpAssets = this.props.assetsToAdapt;
                tmpAssets[i].sewer_connection = e.target.value;
                this.props.adaptAssets(tmpAssets);
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
              <input type="radio" name={"drainage"+i} value="riool" checked={e.sewer_connection===true}
              onChange={
                (e) => {
                  let tmpAssets = this.props.assetsToAdapt;
                  tmpAssets[i].sewer_connection = true;
                  this.props.adaptAssets(tmpAssets);
                }
              }
              readOnly={!this.props.editMode}
              disabled={!this.props.editMode}
              />
              riool
            </label>
            <label className="radio-inline"
              
            >
              <input type="radio" name={"drainage"+i} value="tuin" checked={e.sewer_connection===false}
              onChange={
                (e) => {
                  let tmpAssets = this.props.assetsToAdapt;
                  tmpAssets[i].sewer_connection = false;
                  this.props.adaptAssets(tmpAssets);
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
                  let tmpAssets = this.props.assetsToAdapt;
                  tmpAssets.splice(i, 1);
                  this.props.adaptAssets(tmpAssets);
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
          {this.createCardBody(e,i)}
        </Col>
      </Row>
    );
  }

  render() {

    const totalArea = this.props.assetsToAdapt
                        .filter(e=>e.category===this.selectedTabToCategory(this.props.selectedTab))
                        .reduce((acc,e) =>  acc + (e.area || 0), 0);

    return (
          <div className={"form-group " + styles.Assets}style={{marginTop: '-4px'}}>
            <Row>
              <Col md={6} SM={12} XS={12}>
                <select 
                  value={""} 
                  className="form-control"
                  onChange={(e)=>{
                    const selectedItem = this.findAssetType(
                      e.target.value, 
                      this.selectedTabToCategory(this.props.selectedTab)
                    );
                    selectedItem.area = 10;
                    selectedItem.sewer_connection = true;
                    const tmpAssets = this.props.assetsToAdapt;
                    tmpAssets.unshift(selectedItem);
                    this.props.adaptAssets(tmpAssets);
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
                    .map(  e => <option key={e.name} value={e.name}>{e.name}</option>)
                  }
                </select>
              </Col>
            </Row>
          
               <table
                style={{
                  width:"100%",
                  marginTop: "10px",
                }}
               >
                 <thead>
                  <tr>
                    <th>Type</th>
                    <th>Oppervlak (m<sup>2</sup>)</th>
                    {
                      this.props.showDetails
                      ?
                        <th>
                          Berging (mm)
                        </th>
                      :
                      null
                    }
                    {
                      this.props.showDetails
                      ?
                        <th>
                          Afvoer naar (mm)
                        </th>
                      :
                      null
                    }
                    {
                      this.props.showDetails
                      ?
                      <th style={{textAlign: "right"}}>
                        <a
                          onClick={
                            this.props.setHideDetails
                          }
                        >
                          {"Verberg details"}
                        </a>
                      </th>
                      :
                      <th style={{textAlign: "right"}}>
                        <a
                          onClick={
                            this.props.setShowDetails
                          }
                        >
                          Toon details
                        </a>
                      </th>
                    }
                    
                  </tr>
                </thead>
                <tbody>

                
                {
                  this.props.assetsToAdapt.map((e,i)=>{
                    if (this.selectedTabToCategory(this.props.selectedTab) !== e.category) {
                      return '';
                    } else {
                      return (
                        <tr key={i}>
                          <td>
                            <span>{e.name}</span>
                          </td>
                          <td>
                            <input 
                              value={e.area} 
                              className="form-control"
                              onChange={(e) => {
                                let tmpAssets = this.props.assetsToAdapt;
                                tmpAssets[i].area = parseInt(e.target.value) || '';
                                this.props.adaptAssets(tmpAssets);
                              }}
                              // readOnly={!this.props.editMode}
                              // disabled={!this.props.editMode}
                            />
                          </td>
                          {
                            this.props.showDetails
                            ?
                            <td>
                              <input 
                                value={e.storage} 
                                className="form-control"
                                onChange={(e) => {
                                  if (
                                    RegExp('^[1-9][0-9]*([,|.])?[0-9]?$').test(e.target.value)
                                    || e.target.value == ''  
                                  ) 
                                  {
                                    let tmpAssets = this.props.assetsToAdapt;
                                    tmpAssets[i].storage = e.target.value;
                                    this.props.adaptAssets(tmpAssets);
                                  }
                                }}
                              />
                            </td>
                            :
                            null
                          }
                          {
                            this.props.showDetails
                            ?
                            <td>
                            <label className="radio-inline" 
              
                            >
                              <input type="radio" name={"drainage"+i} value="riool" checked={e.sewer_connection===true}
                              onChange={
                                (e) => {
                                  let tmpAssets = this.props.assetsToAdapt;
                                  tmpAssets[i].sewer_connection = true;
                                  this.props.adaptAssets(tmpAssets);
                                }
                              }
                              readOnly={!this.props.editMode}
                              disabled={!this.props.editMode}
                              />
                              riool
                            </label>
                            <label className="radio-inline"
                              
                            >
                              <input type="radio" name={"drainage"+i} value="tuin" checked={e.sewer_connection===false}
                              onChange={
                                (e) => {
                                  let tmpAssets = this.props.assetsToAdapt;
                                  tmpAssets[i].sewer_connection = false;
                                  this.props.adaptAssets(tmpAssets);
                                }
                              }
                              readOnly={!this.props.editMode}
                              disabled={!this.props.editMode}
                              />
                              tuin
                            </label>
                            
                            </td>
                            :
                            null
                          }
                          <td>
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
                                let tmpAssets = this.props.assetsToAdapt;
                                tmpAssets.splice(i, 1);
                                this.props.adaptAssets(tmpAssets);
                              }}
                            >
                             x
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  })
                }
               {/* {this.drawRows(this.props.assetsToAdapt)} */}
               </tbody>
               {this.props.selectedTab !== 'extra' ?
               <tfoot>
                 <tr>
                   <td>
                     Totaal 
                   </td>
                   <td>
                    {totalArea}
                   </td>
                 </tr>
               </tfoot>
              :
              "" 
              }
               </table>
            
            
            {/* {this.props.selectedTab !== 'extra' ?
            <Row style={{marginTop:'10px'}}>
              <Col md={6} sm={6} xs={6}>
                <Row>
                  <Col md={12} sm={12} xs={12}>
                    <span style={{fontWeight: 'bold'}}>Totaal Oppervlak: {totalArea} m2</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            :
            ''
            } */}
          </div>
      
    );
  }
}

export default Assets;

import React, { Component, PropTypes } from 'react';
import Assets from './Assets';
import styles from './Tabs.css';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import AppStyles from './App.css';

class Tabs extends Component {

  render() {
    return (
      <div>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <ul className='list-inline' style={{marginLeft:'0px'}}>
            <li 
              className={styles.Tab + ' '  + (this.props.selectedTab === 'dak'? styles.SelectedTab  : styles.NotSelectedTab)}
              onClick={() => this.props.setSelectedTab('dak')}
            >
              <a className={styles.InlineLink}>
                <i className='fa fa-home'></i>&nbsp;Dak
              </a>
            </li>
            <li
              className={styles.Tab + ' '  + (this.props.selectedTab === 'terrein'? styles.SelectedTab  : styles.NotSelectedTab)} 
              onClick={() => this.props.setSelectedTab('terrein')}
            >
              <a className={styles.InlineLink}>
                  <i className='fa fa-tree'></i>&nbsp;Terrein
              </a>
            </li>
            {/* <li className={styles.NotSelectedTab}>&nbsp;</li> */}
            <li 
              className={styles.Tab + ' '  + (this.props.selectedTab === 'extra'? styles.SelectedTab  : styles.NotSelectedTab)}
              onClick={() => this.props.setSelectedTab('extra')}
              
            >
              <a className={styles.InlineLink}>
                <i className='fa fa-circle'></i>&nbsp;Voorzieningen
              </a>
            </li>
            {/* <li style={{}} className={styles.Tab + ' ' + styles.NotSelectedTab}>
              <a className={styles.InlineLink}>
                <i></i>&nbsp;
              </a>
            </li> */}
          </ul>
        </Col>
      </Row>
      {this.props.drawAssets(this.props.selectedTab)}
      </div>
    );
  }
}

Tabs.propTypes = {
  closeMap: PropTypes.func,
};

export default Tabs;

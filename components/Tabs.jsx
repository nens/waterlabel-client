import React, { Component, PropTypes } from 'react';
import styles from './Tabs.css';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import AppStyles from './App.css';

class Tabs extends Component {

  constructor(props) {
    super(props);
    // this._handleClick = this._handleClick.bind(this);
    this.state = {
      selectedTab: 'daken' // daken | terrein | extra
    };
  }

  // _handleClick() {
  //   this.props.closeMap();
  // }

  render() {
    console.log('this.state.selectedTab', this.state.selectedTab)
    return (
      <Row>
        <Col md={12} sm={12} xs={12}>
          <ul className='list-inline'>
            <li 
              className={styles.Tab + ' '  + (this.state.selectedTab === 'daken'? styles.SelectedTab  : styles.NotSelectedTab)}
              // style={{paddingRight: '20px'}}
            >
              <a className={styles.InlineLink}
                  onClick={() => this.setState({selectedTab: 'daken'})}><i className='fa fa-industry'></i>&nbsp;Daken
              </a>
            </li>
            <li
              className={styles.Tab + ' '  + (this.state.selectedTab === 'terrein'? styles.SelectedTab  : styles.NotSelectedTab)} 
              // style={{paddingRight: '20px'}}
            >
              <a className={styles.InlineLink}
                  onClick={()=>this.setState({selectedTab: 'terrein'})}><i className='fa fa-tree'></i>&nbsp;terrein
              </a>
            </li>
            {/* <li className={styles.NotSelectedTab}>&nbsp;</li> */}
            <li className={styles.Tab + ' '  + (this.state.selectedTab === 'extra'? styles.SelectedTab  : styles.NotSelectedTab)}>
              <a className={styles.InlineLink}
                  onClick={()=>this.setState({selectedTab: 'extra'})}><i className='fa fa-circle'></i>&nbsp;extra
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    );
  }
}

Tabs.propTypes = {
  closeMap: PropTypes.func,
};

export default Tabs;

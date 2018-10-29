import React, { Component, PropTypes } from 'react';
import Assets from './Assets';
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
      <div>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <ul className='list-inline' style={{marginLeft:'0px'}}>
            <li 
              className={styles.Tab + ' '  + (this.state.selectedTab === 'daken'? styles.SelectedTab  : styles.NotSelectedTab)}
              onClick={() => this.setState({selectedTab: 'daken'})}
            >
              <a className={styles.InlineLink}>
                <i className='fa fa-home'></i>&nbsp;Dak
              </a>
            </li>
            <li
              className={styles.Tab + ' '  + (this.state.selectedTab === 'terrein'? styles.SelectedTab  : styles.NotSelectedTab)} 
              onClick={()=>this.setState({selectedTab: 'terrein'})}
            >
              <a className={styles.InlineLink}>
                  <i className='fa fa-tree'></i>&nbsp;Terrein
              </a>
            </li>
            {/* <li className={styles.NotSelectedTab}>&nbsp;</li> */}
            <li 
              className={styles.Tab + ' '  + (this.state.selectedTab === 'extra'? styles.SelectedTab  : styles.NotSelectedTab)}
              onClick={()=>this.setState({selectedTab: 'extra'})}
            >
              <a className={styles.InlineLink}>
                <i className='fa fa-circle'></i>&nbsp;Extra
              </a>
            </li>
            <li style={{}} className={styles.Tab + ' ' + styles.NotSelectedTab}>
              <a className={styles.InlineLink}>
                <i></i>&nbsp;
              </a>
            </li>
          </ul>
        </Col>
      </Row>
      <Assets selectedTab={this.state.selectedTab}/>
      </div>
    );
  }
}

Tabs.propTypes = {
  closeMap: PropTypes.func,
};

export default Tabs;

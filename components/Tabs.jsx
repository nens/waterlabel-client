import React, { Component, PropTypes } from 'react';
import styles from './Tabs.css';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import AppStyles from './App.css';

class Tabs extends Component {

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.props.closeMap();
  }

  render() {
    return (
      // <div>Helllo TABS</div>
      // <Row> 
      //   <Col md={12}>

      //     <div 
      //       className={`jumbotron ${AppStyles.Jumbo}`}
      //     >
            <Row>
              <Col md={12} sm={12} xs={12}>
                <ul className='list-inline'>
                  <li 
                    className={styles.Tab + ' '  + styles.NotSelectedTab}
                    // style={{paddingRight: '20px'}}
                  >
                    <a className={AppStyles.InlineLink}
                        onClick={this.openAboutText}><i className='fa fa-industry'></i>&nbsp;Daken
                    </a>
                  </li>
                  <li
                    className={styles.Tab + ' '  + styles.NotSelectedTab} 
                    // style={{paddingRight: '20px'}}
                  >
                    <a className={AppStyles.InlineLink}
                        onClick={this.openMap}><i className='fa fa-tree'></i>&nbsp;terrein
                    </a>
                  </li>
                  {/* <li className={styles.NotSelectedTab}>&nbsp;</li> */}
                  <li className={styles.Tab + ' '  + styles.SelectedTab}>
                    <a className={AppStyles.InlineLink}
                        onClick={this.openMap}><i className='fa fa-circle'></i>&nbsp;extra
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

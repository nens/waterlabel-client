import React, { Component, PropTypes } from 'react';
import styles from './App.css';import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';

const HeaderNavigator = (({ openAboutText, openMap, openPrivacyText}) => (
  <Row>
  <Col md={6} sm={12} xs={12}>
      <ul className='list-inline'>
        <li>
          <a className={styles.InlineLink}
            onClick={openAboutText}><i className='fa fa-info-circle'></i>&nbsp;Over label Opslag Water
          </a>
        </li>
        {/* <li>&nbsp;</li>
        <li>
          <a className={styles.InlineLink}
            onClick={openMap}><i className='fa fa-globe'></i>&nbsp;Bekijk Kaart
          </a>
        </li> */}
      </ul>
    </Col>
    <Col md={6} sm={12} xs={12}>
      <div className='pull-right' style={{ marginRight: 10 }}>
      <a href='https://twitter.com/waterlabel/'
        target='_blank'
        style={{
          padding: '10px 5px 0 0',
        }}>
        <i className='fa fa-2x fa-twitter-square' />
      </a>
      <a
        href='https://www.facebook.com/Waterlabel-421181284911824/'
        target='_blank'
        style={{
          padding: '10px 5px 0 0',
        }}>
        <i
          className='fa fa-2x fa-facebook-square' />
      </a>
      <a href='https://www.youtube.com/watch?v=jARteOPf_aI'
        target='_blank'
        style={{
          padding: '10px 0px 0 0',
        }}>
        <i className='fa fa-2x fa-youtube-square' />
      </a><br/>
      <a
        onClick={openPrivacyText}><small>Cookies &amp; Privacy</small>
      </a>
    </div>
  </Col>
</Row>

  
)
);

HeaderNavigator.propTypes = {}

export default HeaderNavigator
import React, { Component, PropTypes } from 'react';
import styles from './AddressListPicker.css';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import appStyles from './App.css';

const AddressListPicker = (({ onClick, addresses}) => (
  <ul>
    {
      addresses.map((address, index) =>
        <li
        key={index}
        onClick={e => onClick(address)}
        >
          {address.postalcode + ' ' + address.housenumber + ' ' + (address.houseletter || '')}
        </li>
      )
      
    }
    
  </ul>
  
)
);

AddressListPicker.propTypes = {}

export default AddressListPicker
import React, { Component, PropTypes } from 'react';
import styles from './SelectedObjectDetails.css';

import {
  clearSelectedObject,
} from '../actions.jsx';


class SelectedObjectDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { postcode, dispatch } = this.props;
    if (postcode && postcode.selectedObject && postcode.selectedObject.gid) {
      const selectedObject = postcode.selectedObject;

      const svgStyle = () => {
        if (selectedObject.label === 'A') {
          return styles.labelA;
        }
        if (selectedObject.label === 'B') {
          return styles.labelB;
        }
        if (selectedObject.label === 'C') {
          return styles.labelC;
        }
        if (selectedObject.label === 'D') {
          return styles.labelD;
        }
        if (selectedObject.label === 'E') {
          return styles.labelE;
        }
        if (selectedObject.label === 'F') {
          return styles.labelF;
        }
        if (selectedObject.label === 'G') {
          return styles.labelG;
        }
        return styles.labelG;
      };
      // return false;
      return (
        <div className={styles.SelectedObjectDetails}>
        <div
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: 10,
            top: 10,
          }}>
            <i
              onClick={() => dispatch(clearSelectedObject())}
              className='fa fa-close' />
        </div>
        <table className='table-striped'>
        <tbody>
          <tr>
            <td>Waterlabel</td>
            <td className='address-label'>
              <svg className={svgStyle()} width='48.5' height='17'>
                <polygon points='0,0 40,0 48.5,8.5 40,17 0,17' />
                <text style={{ 'fill': 'white' }} x='2' y='13'>
                  {selectedObject.label}
                </text>
              </svg>
            </td>
          </tr>
          <tr>
            <td>Energielabel</td>
            <td className='address-label'>
              <svg className={svgStyleEnergy()} width='48.5' height='17'>
                <polygon points='0,0 40,0 48.5,8.5 40,17 0,17' />
                <text style={{ 'fill': 'white' }} x='2' y='13'>
                  {energielabel}
                </text>
              </svg>
            </td>
          </tr>
          </tbody>
        </table>
        <br/>
        <center>
          <button
            className='hidden btn btn-info'
            onClick={this.props.openCalculator}>
            <i className='fa fa-tag' />&nbsp;Mijn Waterlabel
          </button>
        </center>
        </div>
       );
    }
    return <div/>;
  }
}


SelectedObjectDetails.propTypes = {
  dispatch: PropTypes.func,
  openCalculator: PropTypes.func,
  postcode: PropTypes.any,
};

export default SelectedObjectDetails;

import React, { Component, PropTypes } from 'react';
import styles from './CloseButton.css';

class CloseButton extends Component {

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.props.closeMap();
  }

  render() {
    return (
      <svg
        className={styles.closeButton}
        onClick={this._handleClick}
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 21 21">
        <path
          stroke="#000000"
          strokeMiterlimit="20"
          fill="none"
          d="M20.51.508l-20 20M20.51 20.508l-20-20"/>
        </svg>
    );
  }
}

CloseButton.propTypes = {
  closeMap: PropTypes.func,
};

export default CloseButton;

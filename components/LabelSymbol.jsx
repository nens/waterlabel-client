import React, { Component, PropTypes } from 'react';
import styles from './Assets.css';
import { Grid, Row, Col, Modal, Button, ButtonGroup, OverlayTrigger,
  Popover, Well } from 'react-bootstrap';
import appStyles from './App.css'
import calculatorStyles from './Calculator.css';
import LabelSymbolStyles from './LabelSymbol.css';


class LabelSymbol extends Component {

  render () {
    const { labelObj } = this.props;

    return (
      <Col md={6} sm={12} xs={12}>
        <Row>
          <Col md={6} sm={4} xs={6}>
          {/* <span className={styles.Label}>
            {labelObj.code}
          </span> */}
          <ol className={calculatorStyles.labels}>
            <li>
              <svg className={calculatorStyles.labelA}
                  width='108.5'
                  height='17'>
                <polygon
                  points='0,0 100,0 108.5,8.5 100,17 0,17' />
                <text
                  style={{ 'fill': 'white' }}
                  x='2'
                  y='15'>A
                </text>
              </svg>
              {/* <div style={{transform: "scale(1.7)"}}>
                <svg className={calculatorStyles.labelA}
                    width='108.5'
                    height='17'>
                  <polygon
                    points='0,0 100,0 108.5,8.5 100,17 0,17' />
                  <text
                    style={{ 'fill': 'white' }}
                    x='2'
                    y='15'>A
                  </text>
                </svg>
              </div> */}
              
              {/* {(postcode.selectedObject.properties.labelcode_last === 'A') ?
              <svg
                className={calculatorStyles.labelA}
                width='48.5'
                height='17'>
                <text style={{ 'fill': 'black' }}
                      x='10'
                      y='13'>&larr;
                </text>
              </svg> : ''} */}
            </li>
            <li>
              <svg
                className={calculatorStyles.labelB}
                width='98.5'
                height='17'>
                  <polygon
                    points='0,0 90,0 98.5,8.5 90,17 0,17' />
                  <text
                    style={{ 'fill': 'white' }}
                    x='2'
                    y='15'>B
                  </text>
              </svg>
              {/* {(postcode.selectedObject.properties.labelcode_last === 'B') ?
              <svg
                className={calculatorStyles.labelB}
                width='48.5'
                height='17'>
                  <text
                    style={{ 'fill': 'black' }}
                    x='10'
                    y='13'>&larr;
                  </text>
              </svg> : ''} */}
            </li>
            <li>
              <svg
                className={calculatorStyles.labelC}
                width='88.5'
                height='17'>
                  <polygon
                    points='0,0 80,0 88.5,8.5 80,17 0,17' />
                  <text
                    style={{ 'fill': 'white' }}
                    x='2'
                    y='15'>C
                  </text>
              </svg>
              {/* {(postcode.selectedObject.properties.labelcode_last === 'C') ?
              <svg
                className={calculatorStyles.labelC}
                width='48.5'
                height='17'>
                  <text
                    style={{ 'fill': 'black' }}
                    x='10'
                    y='15'>&larr;
                  </text>
              </svg> : ''} */}
            </li>
            <li>
              <svg
                className={calculatorStyles.labelD}
                width='78.5'
                height='17'>
                  <polygon
                    points='0,0 70,0 78.5,8.5 70,17 0,17' />
                  <text
                    style={{ 'fill': 'white' }}
                    x='2'
                    y='15'>D
                  </text>
              </svg>
              {/* {(labelObj.code === 'D') ?
              <svg
                className={calculatorStyles.labelD}
                width='48.5'
                height='17'>
                  <text
                    style={{ 'fill': 'black' }}
                    x='10'
                    y='15'>&larr;
                  </text>
              </svg> : ''} */}
            </li>
            <li>
              <svg
                className={calculatorStyles.labelE}
                width='68.5'
                height='17'>
                  <polygon
                    points='0,0 60,0 68.5,8.5 60,17 0,17' />
                  <text
                    style={{ 'fill': 'white' }}
                    x='2'
                    y='15'>E
                  </text>
              </svg>
              {/* {(postcode.selectedObject.properties.labelcode_last === 'E') ?
              <svg
                className={calculatorStyles.labelE}
                width='48.5'
                height='17'>
                  <text
                    style={{ 'fill': 'black' }}
                    x='10'
                    y='13'>&larr;
                  </text>
              </svg> : ''} */}
            </li>
            <li>
              <svg
                className={calculatorStyles.labelF}
                width='58.5'
                height='17'>
                  <polygon
                    points='0,0 50,0 58.5,8.5 50,17 0,17' />
                  <text
                    style={{ 'fill': 'white' }}
                    x='2'
                    y='15'>F
                  </text>
              </svg>
              {/* {(postcode.selectedObject.properties.labelcode_last === 'F') ?
              <svg
                className={calculatorStyles.labelF}
                width='48.5'
                height='17'>
                  <text
                    style={{ 'fill': 'black' }}
                    x='10'
                    y='15'>&larr;
                  </text>
              </svg> : ''} */}
            </li>
            <li>
              <svg
                className={calculatorStyles.labelG}
                width='48.5'
                height='17'>
                  <polygon
                    points='0,0 40,0 48.5,8.5 40,17 0,17' />
                  <text
                    style={{ 'fill': 'white' }}
                    x='2'
                    y='15'>G
                  </text>
              </svg>
              {/* {(postcode.selectedObject.properties.labelcode_last === 'G') ?
              <svg
                className={calculatorStyles.labelG}
                width='48.5'
                height='17'>
                  <text
                    style={{ 'fill': 'black' }}
                    x='10'
                    y='15'>&larr;
                  </text>
              </svg> : ''} */}
            </li>
          </ol>
          </Col>
          <Col md={6} sm={8} xs={6}>
              <div className={LabelSymbolStyles.Label}>{labelObj.code}</div>
          </Col>
          </Row>
        </Col>
    );
  }
}

export default LabelSymbol;

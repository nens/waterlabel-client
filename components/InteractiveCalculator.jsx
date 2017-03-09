import L from 'leaflet';
import {
  Map,
  TileLayer,
  FeatureGroup,
  Circle,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import GeoJsonUpdatable from '../lib/GeoJsonUpdatable.jsx';
import { Grid, Col, Row, Button, Form, FormGroup, ControlLabel, InputGroup, FormControl, HelpBlock, OverlayTrigger, Popover } from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';
import styles from './InteractiveCalculator.css';

class InteractiveCalculator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zoomlevel: 8,
    };
    this._handleZoomEnd = this._handleZoomEnd.bind(this);
    this._handleMoveEnd = this._handleMoveEnd.bind(this);
    this._handleMapClick = this._handleMapClick.bind(this);
    this._onEditPath = this._onEditPath.bind(this);
    this._onDeleted = this._onDeleted.bind(this);
    this._onCreate = this._onCreate.bind(this);
  }

  componentDidMount() {}

  _handleMoveEnd(e) {
    // console.log('_handleMoveEnd', e.target._initialCenter, e.target._zoom);
  }

  _handleZoomEnd(e) {
    this.setState({ zoomlevel: e.target._zoom });
  }

  _handleMapClick(e) {
    // Center map on clicked position
    this.refs.map.leafletElement.panTo(new L.LatLng(e.latlng.lat, e.latlng.lng));
  }

  _onEditPath() {
    console.log('onEditPath()');
  }

  _onDeleted() {
    console.log('onDeleted');
  }

  _onCreate() {
    console.log('_onCreate');
  }

  render() {

    const initialLocation = {
      lat: (this.props.postcode &&
        this.props.postcode.maplocation &&
        this.props.postcode.maplocation.lat) ?
        Number(this.props.postcode.maplocation.lat) :
        52.1741,
      lng: (this.props.postcode &&
        this.props.postcode.maplocation &&
        this.props.postcode.maplocation.lng) ?
        Number(this.props.postcode.maplocation.lng) :
        5.2032,
    };
    const position = [initialLocation.lat, initialLocation.lng];

    return (
      <Map center={position}
       ref='map'
       onZoomEnd={this._handleZoomEnd}
       onMoveEnd={this._handleMoveEnd}
       zoomControl={false}
       onClick={this._handleMapClick}
       zoom={(this.props.postcode &&
         this.props.postcode.maplocation &&
         this.props.postcode.maplocation.zoom) ?
          Number(this.props.postcode.maplocation.zoom) :
         this.state.zoomlevel}
       style={{
         position: 'absolute',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%',
       }}>
        <TileLayer
          attribution='Mapbox'
          url='https://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/{z}/{x}/{y}.png'
        />
        <FeatureGroup>
            <EditControl
              position='topright'
              onEdited={this._onEditPath}
              onCreated={this._onCreate}
              onDeleted={this._onDeleted}
              draw={{
                rectangle: false
              }}
            />
            <Circle center={[51.51, -0.06]} radius={200} />
        </FeatureGroup>
      </Map>
    );
  }
}

InteractiveCalculator.propTypes = {
  dispatch: PropTypes.func,
};

export default InteractiveCalculator;

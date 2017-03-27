import _ from 'underscore';
import { Map, TileLayer } from 'react-leaflet';
import GeoJsonUpdatable from '../lib/GeoJsonUpdatable.jsx';
import L from 'leaflet';
import React, { Component, PropTypes } from 'react';

import {
  fetchChoropleth,
  radiusSearch,
} from '../actions.jsx';

function getColor(d) {
  const result = _.max(d, (label) => {
    return label.count;
  });
  const returnlabels = {
    'A': '#528E47',
    'B': '#6EA84B',
    'C': '#A5BA3E',
    'D': '#F7ED13',
    'E': '#D99C20',
    'F': '#B96526',
    'G': '#B33527',
  };
  return returnlabels[result.label];
}

class WaterlabelMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zoomlevel: (this.props.postcode.maplocation) ?
        Number(this.props.postcode.maplocation.zoom) : 8,
    };
    this._handleZoomEnd = this._handleZoomEnd.bind(this);
    this._handleMoveEnd = this._handleMoveEnd.bind(this);
    this._handleMapClick = this._handleMapClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      fetchChoropleth()
    );
  }

  _handleZoomEnd(e) {
    this.setState({
      zoomlevel: e.target._zoom,
    });
  }

  _handleMoveEnd() {
    // console.log('_handleMoveEnd', e.target._initialCenter, e.target._zoom);
  }

  _handleMapClick(e) {
    // Center map on clicked position
    this.refs.map.leafletElement.panTo(
      new L.LatLng(e.latlng.lat, e.latlng.lng)
    );
    this.props.dispatch(radiusSearch({
      'lat': e.latlng.lat,
      'lng': e.latlng.lng,
    }));
  }

  onEachFeature(feature, layer) {
    layer.on('mouseover', (e) => {
      const _layer = e.target;
      _layer.setStyle({
        weight: 2,
      });

      if (!L.Browser.ie && !L.Browser.opera) {
        _layer.bringToFront();
      }
    });

    layer.on('mouseout', (e) => {
      const _layer = e.target;
      _layer.setStyle({
        weight: 0,
      });
    });

    layer.setStyle({
      weight: 0,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
      fillColor: getColor([
        {
          'label': 'A',
          'count': feature.properties.label_a,
        },
        {
          'label': 'B',
          'count': feature.properties.label_b,
        },
        {
          'label': 'C',
          'count': feature.properties.label_c,
        },
        {
          'label': 'D',
          'count': feature.properties.label_d,
        },
        {
          'label': 'E',
          'count': feature.properties.label_e,
        },
        {
          'label': 'F',
          'count': feature.properties.label_f,
        },
        {
          'label': 'G',
          'count': feature.properties.label_g,
        },
      ]),
    });

    layer.bindPopup(`<strong>${feature.properties.name}</strong><br/>
      <ol style='padding: 0;list-style-type: none;'>
          <li>
              <svg style='fill: rgb(27, 142, 67)' width='108.5' height='17'>
                  <polygon points='0,0 100,0 108.5,8.5 100,17 0,17'></polygon>
                  <text style='fill:white' x='2' y='13'>
                    ${feature.properties.label_a}x
                  </text>
              </svg>
          </li>
          <li>
              <svg style='fill: rgb(74, 168, 71)' width='98.5' height='17'>
                  <polygon points='0,0 90,0 98.5,8.5 90,17 0,17'></polygon>
                  <text style='fill:white' x='2' y='13'>
                    ${feature.properties.label_b}x
                  </text>
              </svg>
          </li>
          <li>
              <svg style='fill: rgb(157, 186, 58)' width='88.5' height='17'>
                  <polygon points='0,0 80,0 88.5,8.5 80,17 0,17'></polygon>
                  <text style='fill:white' x='2' y='13'>
                    ${feature.properties.label_c}x
                  </text>
              </svg>
          </li>
          <li>
              <svg style='fill: rgb(250, 236, 13)' width='78.5' height='17'>
                  <polygon points='0,0 70,0 78.5,8.5 70,17 0,17'></polygon>
                  <text style='fill:white' x='2' y='13'>
                    ${feature.properties.label_d}x
                  </text>
              </svg>
          </li>
          <li>
              <svg style='fill: rgb(235, 157, 33)' width='68.5' height='17'>
                  <polygon points='0,0 60,0 68.5,8.5 60,17 0,17'></polygon>
                  <text style='fill:white' x='2' y='13'>
                    ${feature.properties.label_e}x
                  </text>
              </svg>
          </li>
          <li>
              <svg style='fill: rgb(207, 101, 39)' width='58.5' height='17'>
                  <polygon points='0,0 50,0 58.5,8.5 50,17 0,17'></polygon>
                  <text style='fill:white' x='2' y='13'>
                    ${feature.properties.label_f}x
                  </text>
              </svg>
          </li>
          <li>
              <svg style='fill: rgb(206, 52, 42)' width='48.5' height='17'>
                  <polygon points='0,0 40,0 48.5,8.5 40,17 0,17'></polygon>
                  <text style='fill:white' x='2' y='13'>
                    ${feature.properties.label_g}x
                  </text>
              </svg>
          </li>
      </ol>`);
  }

  render() {
    const { postcode, choropleth } = this.props;
    const initialLocation = {
      lat: (postcode &&
        postcode.maplocation &&
        postcode.maplocation.lng) ?
        Number(postcode.maplocation.lng) :
        52.1741,
      lng: (postcode &&
        postcode.maplocation &&
        postcode.maplocation.lat) ?
        Number(postcode.maplocation.lat) :
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
         zoom={(postcode &&
           postcode.maplocation &&
           postcode.maplocation.zoom) ?
            Number(postcode.maplocation.zoom) :
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
           url='https://{s}.tiles.mapbox.com/v3/nelenschuurmans.5641a12c/{z}/{x}/{y}.png'
         />
          <TileLayer
            attribution='Nelen &amp; Schuurmans'
            url='/static_media/waterlabel/{z}/{x}/{y}.png'
          />
          <TileLayer
            attribution='Nelen &amp; Schuurmans'
            url='https://{s}.tiles.mapbox.com/v3/nelenschuurmans.0a5c8e74/{z}/{x}/{y}.png'
          />
        {(this.state.zoomlevel < 12 && choropleth.choropleth) ?
          <GeoJsonUpdatable
            data={choropleth.choropleth}
            onEachFeature={this.onEachFeature.bind(this)}
          />
        : ''}
        {(postcode && postcode.selectedObject && postcode.selectedObject.geometry) ?
          <GeoJsonUpdatable
            data={postcode.selectedObject.geometry}
            onEachFeature={(feature, layer) => {
              layer.setStyle({
                'color': '#ffffff',
                'fill': false,
                'weight': 5,
                'opacity': 1,
                'dashArray': '5, 10',
              });
            }}
          />
        : ''}
        </Map>
    );
  }
}

WaterlabelMap.propTypes = {
  choropleth: PropTypes.any,
  dispatch: PropTypes.func,
  postcode: PropTypes.any,
};

export default WaterlabelMap;

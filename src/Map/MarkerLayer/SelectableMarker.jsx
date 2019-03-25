import React, { Component } from 'react';

import { Marker, CircleMarker, Popup } from 'react-leaflet';

// Preload images
['public/images/marker-disabled.png', 'public/images/marker-selected.png'].forEach(url => {
  const preloaded = new Image();
  preloaded.src = url;
});

const ICON_DEFAULTS = {
  iconSize     : [25, 41],
  iconAnchor   : [12, 41],
  shadowUrl    : 'public/images/marker-shadow.png',
  shadowSize   : [41, 41],
  shadowAnchor : [12, 41],
  popupAnchor  : [0, -30]
}

const DEFAULT_ICON = L.icon(Object.assign({
  iconUrl: 'public/images/marker.png'
}, ICON_DEFAULTS));

const DISABLED_ICON = L.icon(Object.assign({
  iconUrl: 'public/images/marker-disabled.png'
}, ICON_DEFAULTS));

const SELECTED_ICON = L.icon({
  iconUrl     : 'public/images/marker-selected.png',
  iconSize    : [53, 65],
  iconAnchor  : [24, 42],
  popupAnchor : [0, -50]
});

export default class SelectableMarker extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Marker
        position={this.props.place.geom.coordinates.reverse()}
        icon={this.props.selected ? SELECTED_ICON : (this.props.disabled ? DISABLED_ICON : DEFAULT_ICON)}
        onClick={this.props.onClick}>
        <Popup>
          <React.Fragment>
            <h1>{this.props.place.location_name}</h1>
            <h2>{this.props.place.type}</h2>
            {this.props.place.alias && 
               <span className="alias">{this.props.place.alias}</span>
            }
            {this.props.place.admin_unit &&
              <React.Fragment>
                {(this.props.place.alias) ? ', ' : ''}
                <span className="admin-unit">{this.props.place.admin_unit}</span>
              </React.Fragment>
            }
            <p>
              {this.props.place.location_description}
            </p>
          </React.Fragment>
        </Popup>
      </Marker>
    )
  }

}

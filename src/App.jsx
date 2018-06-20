import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer, LayerGroup, CircleMarker, Popup } from 'react-leaflet';
import Control from 'react-leaflet-control';
import axios from 'axios';

import Modal from './components/Modal.jsx';
import MapControls from './MapControls/MapControls.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';

import '../public/style/app.scss';

const tiles = 'https://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png';
const attribution = 'Map tiles: <a href="http://dare.ht.lu.se/">DARE 2018</a>';
const mapCenter = [48.1638, 16.9528];
const zoomLevel = 8;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { markers: [] };
  }

  componentDidMount() {
    axios.get('public/data/places.json')
      .then(res => {
        this.setState({markers: res.data});
      })
  }

  openAppInfo() {
    this._appinfo.show();
  }

  zoomIn() {
    const map = this.leafletMap.leafletElement;
    map.zoomIn();
  }

  zoomOut() {
    const map = this.leafletMap.leafletElement;
    map.zoomOut();
  }

  onMarkerClick(idx) {
    console.log(idx);
  }

  render() {
    return (
      <div className='container'>
        <Map
          className='map'
          zoomControl={false}
          ref={m => {this.leafletMap = m;}}
          center={mapCenter}
          zoom={zoomLevel}>

          <TileLayer
            attribution={attribution}
            url={tiles} />

          <LayerGroup>
            {this.state.markers.map((position, idx) =>
              <CircleMarker
                key={`marker-${idx}`}
                center={position}
                radius={5}
                color='#a64a40'
                opacity={1}
                fillColor='#e75444'
                fillOpacity={1}
                weight={1.5}
                onClick={e => this.onMarkerClick.bind(this)(idx)}>
                
                <Popup>
                  <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                </Popup>
              </CircleMarker>
            )}
          </LayerGroup>
        </Map>

        <Sidebar></Sidebar>

        <MapControls
          onOpenAppInfo={this.openAppInfo.bind(this)}
          onZoomIn={this.zoomIn.bind(this)}
          onZoomOut={this.zoomOut.bind(this)} />

        <Modal className="appinfo" ref={c => this._appinfo = c}>

        </Modal>

        <Modal className="locationdetails" />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));

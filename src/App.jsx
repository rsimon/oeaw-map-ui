import React, { Component } from 'react';
import update from 'react-addons-update';
import { render } from 'react-dom';
import { Map, TileLayer, LayerGroup } from 'react-leaflet';
import Control from 'react-leaflet-control';
import axios from 'axios';

import Modal from './components/Modal.jsx';
import MapControls from './MapControls/MapControls.jsx';
import SelectableMarker from './MapControls/SelectableMarker.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';

import '../public/style/app.scss';

const tiles = 'https://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png';
const attribution = 'Map tiles: <a href="http://dare.ht.lu.se/">DARE 2018</a>';
const mapCenter = [48.1638, 16.9528];
const zoomLevel = 8;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      places: [],
      selectedPlace: undefined
    };
    this.markers = [];
  }

  componentDidMount() {
    axios.get('public/data/places.json')
      .then(result => {
        this.setState({ places: result.data });
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

  selectPlace(idx) {
    /*
    const updated = (this.state.selectedPlace) ?
      update(this.state.places, {
        [idx]: { selected: { $set: true }},
        [this.state.selectedPlace]: { selected: { $set: false }}
      }) : update(this.state.places, {
        [idx]: { selected: { $set: true }}
      });

    this.setState({
      places: updated,
      selectedPlace: idx
    });
    */
  }

  onSelectPlace(event) {
    this.selectPlace(event.target.options.idx);
  }

  onSelectPerson(person) {
    console.log('selected person', person);

    // DUMMY - normally, a person will carry links to places, which we want to highlight
    // on the map. Since we don't have live data yet, and just want to get the plumbing in
    // place, we'll just highlight a place at random for now.

    const idx = Math.floor((Math.random() * this.state.places.length) + 1);
    // this.selectPlace(idx);
    const marker = this.markers[idx];
    marker.select();
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
            {this.state.places.map((place, idx) =>
              <SelectableMarker
                key={`marker-${idx}`}
                ref={m => {this.markers[idx] = m;}}
                idx={idx}
                place={place}
                selected={place.selected}
                onClick={this.onSelectPlace.bind(this)} />
            )}
          </LayerGroup>
        </Map>

        <Sidebar
          onSelectPerson={this.onSelectPerson.bind(this)} />

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

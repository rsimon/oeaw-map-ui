import React, { Component } from 'react';
import update from 'react-addons-update';
import { render } from 'react-dom';
import axios from 'axios';

import Modal from './common/Modal.jsx';
import Map from './Map/Map.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';

import '../public/style/app.scss';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {places:[]}
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

  onSelectPlace(event) {
    this.selectPlace(event.target.options.idx);
  }

  onSelectPerson(person) {
    console.log('selected person', person);

    // DUMMY - normally, a person will carry links to places, which we want to highlight
    // on the map. Since we don't have live data yet, and just want to get the plumbing in
    // place, we'll just highlight a place at random for now.

    // const idx = Math.floor((Math.random() * this.state.places.length) + 1);
    // this.selectPlace(idx);
    // const marker = this.markers[idx];
    // marker.select();
  }

  render() {
    return (
      <div className='container'>
        <Map
          places={this.state.places}
          onOpenAppInfo={this.openAppInfo.bind(this)} />

        <Sidebar onSelectPerson={this.onSelectPerson.bind(this)} />

        <Modal className="appinfo" ref={c => this._appinfo = c} />

        <Modal className="locationdetails" />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));

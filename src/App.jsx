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

    this.state = {
      places: [],
      showAppInfo: false,
      showLocationInfo: false
    }
  }

  componentDidMount() {
    axios.get('public/data/places.json')
      .then(result => {
        this.setState({ places: result.data });
      })
  }

  openAppInfo() {
    this.setState({showAppInfo: true});
  }

  closeAppInfo() {
    this.setState({showAppInfo: false});
  }

  onSelectPerson(person) {
    console.log('selected person', person);

    // DUMMY - normally, a person will carry links to places, which we want to highlight
    // on the map. Since we don't have live data yet, and just want to get the plumbing in
    // place, we'll just highlight a place at random for now.

    const idx = Math.floor((Math.random() * 300) + 1);
    this._map.selectByIndex([ idx ]);
  }

  onSelectPlace(place) {

  }

  render() {
    return (
      <div className='container'>
        <Map
          ref={c => this._map = c}
          places={this.state.places}
          onOpenAppInfo={this.openAppInfo.bind(this)}
          onSelectPlace={this.onSelectPlace.bind(this)} />

        <Sidebar
          onSelectPerson={this.onSelectPerson.bind(this)} />

        {this.state.showAppInfo &&
          <Modal
            className="appinfo"
            onClose={this.closeAppInfo.bind(this)}>
            <div className="header">
              <h1>Geschichte der SerbInnen in Wien (1741-1918)</h1>
            </div>
            <div className="content">
              <p className="project-abstract">
                A short project description...
              </p>
              <p cassName="using-the-interface">
                Search, icons
              </p>
            </div>
            <div className="footer">
              <img className="logo oeaw" src="/public/images/logo-oeaw.png" />
              <div className="imprint">
                <span>Österreichische Akademie der Wissenschaften</span>
                <span>Dr. Ignaz Seipel-Platz 2</span>
                <span>1010 Wien</span>
              </div>
              {/* <ul>
                <li>Logos: Project, (AIT? 'software development by...')</li>
              </ul> */}
            </div>
          </Modal>
        }

        {this.state.showLocationInfo &&
          <Modal className="locationdetails">
          </Modal>
        }
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));

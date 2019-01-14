import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import AppInfo from './AppInfo.jsx';
import Map from './Map/Map.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';

import '../public/style/app.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      people : [], // All people in the dataset
      places : [], // All places in the dataset

      selectedPerson: null,  // Currently selected person, if any
      placeDetailsFor: null, // Details model for a selected place, if any

      isAppInfoVisible: false // UI state: app info modal visible?
    }
  }

  componentDidMount() {
    axios.get('public/data/data.json')
      .then(result => {
        const people = result.data.map(record => {
          const clone = Object.assign({}, record);
          delete clone.places;
          return clone;
        });

        // An elaborate flatMap replacement... (sigh)
        const places = [].concat.apply([], result.data.map(record => {
          return record.places;
        }));

        // Initial state
        this.setState({
          people: people,
          places: places,
          selectedPerson: null,
          placeDetailsFor: null
        });
      })
  }

  openAppInfo() {
    this.setState({ isAppInfoVisible: true });
  }

  closeAppInfo() {
    this.setState({ isAppInfoVisible: false });
  }

  onSelectPerson(person) {
    this.setState({ selectedPerson: person });
  }

  onSelectPlace(place) {
    const person = (place) ? this.state.people.find(person => {
      return person.name == place.name;
    }) : null;

    this.setState({ selectedPerson: person });
  }

  render() {
    return (
      <div className='container'>
        <Map
          places={this.state.places}
          selectedPerson={this.state.selectedPerson}
          onSelectPlace={this.onSelectPlace.bind(this)}
          onOpenAppInfo={this.openAppInfo.bind(this)} />

        <Sidebar
          people={this.state.people}
          selectedPerson={this.state.selectedPerson}
          onSelectPerson={this.onSelectPerson.bind(this)} />

        {this.state.isAppInfoVisible &&
          <AppInfo onClose={this.closeAppInfo.bind(this)} />
        }

        {this.state.placeDetailsFor &&
          <Modal className="locationdetails">
          </Modal>
        }
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));

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

      selectedPeople: [],  // Currently selected people

      placeDetailsFor: null, // Details model for a selected place, if any

      isAppInfoVisible: false // UI state: app info modal visible?
    }
  }

  componentDidMount() {

    const isSameLocation = (a, b) => {
      return a.geom.coordinates[0] == b.geom.coordinates[0] && 
        a.geom.coordinates[1] == b.geom.coordinates[1];
    }

    axios.get('public/data/data.json')
      .then(result => {
        const people = result.data.map(record => {
          const clone = Object.assign({}, record);
          delete clone.places;
          return clone;
        });

        const distinctPlaces = result.data.reduce((distinct, record) => {
          const toAdd = [];
          record.places.forEach(place => {
            const exists = 
              distinct.find(p => isSameLocation(place, p)) || 
              toAdd.find(p => isSameLocation(place, p));

            if (!exists)
              toAdd.push(place);
          });

          return distinct.concat(toAdd);
        }, []);

        // Initial state
        this.setState({
          people: people,
          places: distinctPlaces,
          selectedPeople: [],
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
    if (person)
      this.setState({ selectedPeople: [ person.id ] });
    else 
      this.setState({ selectedPeople: [] });
  }

  onSelectPlace(place) {
    const people = (place) ? this.state.people.filter(person => {
      return person.name == place.name;
    }).map(person => person.id) : null;

    this.setState({ selectedPeople: people });
  }

  render() {
    return (
      <div className='container'>
        <Map
          places={this.state.places}
          selectedPeople={this.state.selectedPeople}
          onSelectPlace={this.onSelectPlace.bind(this)}
          onOpenAppInfo={this.openAppInfo.bind(this)} />

        <Sidebar
          people={this.state.people}
          selectedPeople={this.state.selectedPeople}
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

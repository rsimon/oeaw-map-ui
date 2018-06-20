import React, { Component } from 'react';
import { AutoSizer, List } from 'react-virtualized';

import PersonDetails from './PersonDetails.jsx';

const list = [
  { name: 'John',    date:1976, gender:'M' },
  { name: 'Jane',    date:1977, gender:'F' },
  { name: 'Alice',   date:1978, gender:'F' },
  { name: 'Bob',     date:1979, gender:'M' },
  { name: 'Clare',   date:1980, gender:'F' },
  { name: 'Daisy',   date:1981, gender:'F' },
  { name: 'Emily',   date:1982, gender:'F' },
  { name: 'Frank',   date:1983, gender:'M' },
  { name: 'Gabriel', date:1984, gender:'M' },
  { name: 'John',    date:1976, gender:'M' },
  { name: 'Jane',    date:1977, gender:'F' },
  { name: 'Alice',   date:1978, gender:'F' },
  { name: 'Bob',     date:1979, gender:'M' },
  { name: 'Clare',   date:1980, gender:'F' },
  { name: 'Daisy',   date:1981, gender:'F' },
  { name: 'Emily',   date:1982, gender:'F' },
  { name: 'Frank',   date:1983, gender:'M' },
  { name: 'Gabriel', date:1984, gender:'M' },
  { name: 'John',    date:1976, gender:'M' },
  { name: 'Jane',    date:1977, gender:'F' },
  { name: 'Alice',   date:1978, gender:'F' },
  { name: 'Bob',     date:1979, gender:'M' },
  { name: 'Clare',   date:1980, gender:'F' },
  { name: 'Daisy',   date:1981, gender:'F' },
  { name: 'Emily',   date:1982, gender:'F' },
  { name: 'Frank',   date:1983, gender:'M' },
  { name: 'Gabriel', date:1984, gender:'M' },
  { name: 'John',    date:1976, gender:'M' },
  { name: 'Jane',    date:1977, gender:'F' },
  { name: 'Alice',   date:1978, gender:'F' },
  { name: 'Bob',     date:1979, gender:'M' },
  { name: 'Clare',   date:1980, gender:'F' },
  { name: 'Daisy',   date:1981, gender:'F' },
  { name: 'Emily',   date:1982, gender:'F' },
  { name: 'Frank',   date:1983, gender:'M' },
  { name: 'Gabriel', date:1984, gender:'M' }
];

export default class PersonList extends Component {

  constructor(props) {
    super(props);
    this.state = { list: list };
  }

  rowRenderer({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
  }) {
    const p = this.state.list[index];

    return (
      <div key={key} style={style} className="row" onClick={this.onClick.bind(this)}>
        <span className="name">{p.name}</span>
        <span className="date">{p.date}</span>
        <span className="gender">
          {(p.gender === 'M') ? String.fromCharCode(0xf222) :  String.fromCharCode(0xf221)}
        </span>
      </div>
    )
  }

  filter(query) {
    const filtered = list.filter(person => {
      return person.name.toLowerCase().startsWith(query.toLowerCase());
    });

    this.setState({list: filtered});
  }

  onClick(e) {
    this._persondetails.show();
  }

  render() {
    return (
      <div className="body">
        <div className="personlist">
          <div className="header">
            <span className="name">Name</span>
            <span className="date">Date</span>
            <span className="gender">Gender</span>
          </div>

          <div className="container">
            <AutoSizer>
              {({ height, width}) => (
                <List
                  className="rows"
                  width={width}
                  height={height}
                  rowCount={this.state.list.length}
                  rowHeight={40}
                  rowRenderer={this.rowRenderer.bind(this)} />
              )}
            </AutoSizer>
          </div>
        </div>

        <PersonDetails ref={c => this._persondetails = c} />
      </div>
    )
  }
}

import React, { Component } from 'react';
import { AutoSizer, List } from 'react-virtualized';

const list = [
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

function rowRenderer ({
  key,         // Unique key within array of rows
  index,       // Index of row within collection
  isScrolling, // The List is currently being scrolled
  isVisible,   // This row is visible within the List (eg it is not an overscanned row)
  style        // Style object to be applied to row (to position it)
}) {
  const p = list[index];

  return (
    <div key={key} style={style} className="row">
      <span className="name">{p.name}</span>
      <span className="date">{p.date}</span>
      <span className="gender">
        {(p.gender === 'M') ? String.fromCharCode(0xf222) :  String.fromCharCode(0xf221)}
      </span>
    </div>
  )
}

export default class PersonList extends Component {
  render() {
    return (
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
                rowCount={list.length}
                rowHeight={40}
                rowRenderer={rowRenderer}/>
            )}
          </AutoSizer>
        </div>
      </div>
    )
  }
}

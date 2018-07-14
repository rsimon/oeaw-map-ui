import React, { Component } from 'react';
import { AutoSizer, List } from 'react-virtualized';

import PersonDetails from './PersonDetails.jsx';

const people = [{
  name: 'Aleksandar Čokor (22.07.1815 Baja - 1884 Vienna)',
  alias: 'Alexander Csokor, Александар Чокор',
  gender: 'M',
  date: 'before 1847-1884',
  description: 'Aleksandar Čokor came from Baja to Vienna where he worked at the North train station (Nordbahnhof) as Officier. Alexandar was born on 22 July 1815 in Baja, and he married Anna Schindler on 24 January 1847 in St Leopold church. Alexander’s adress was Leopoldstadt 702. She was born on 22 July 1818.1 Anna died on 3 July 1856 in house Leopoldstadt 644 in the age of 38 and was burried on 5 July on St. Marx cemetery.2 Alexander´s second wife Theresia died on 12 March 1859 at the age 25 in the same house no 644. She was buried on 14 March on St. Marx cemetery.'
},{
  name: 'Јovan Čokor (04.04.1849-07.01.1911)',
  alias: 'Johann Nepomuk Csokor, Јован Чокор, Istvan Csokor',
  gender: 'M',
  date: '1849-1911',
  description: 'Jovan Čokor was born as Johann Nepomuk Csokor on 4 April 1849, and was baptised on 6 April in Catholic Church of St. Leopold. He was born in house nr. 371 in Leopoldstadt. His father was Alexander Csokor, and mother Anna (Schindler).1  He started his education at Sremski Karlovci by his uncle, archimandrite Julijan Čokor and stayed there from 1854 to the 1864. After that he finished gymnasium in Pest in 1866 and medicine studies in Vienna. He was promoted as Dr. Medicine in 1873. In 1875 he graduated in veterinary science, received an assistant position at the Department of Anatomy and Physiology, was entrusted with lectures on histology and parasitology and introduced the histological-microscopic teaching.\n\nJovan  married Emilie Müller in Vienna on 28 July 1877. They had 5 children:\nEmilie Sofia Maria Čokor (6 Jun 1878),\nFranz Theodor Čokor (8 September 1885 - 5 January 1969),\nJohann Čokor (geboren 22 October 1886 - 1915),\nEugenie Čokor ( 24 November 1887 - 1979 ),\nand Sofie Čokor (6 July 1891 - 1967).\n\nFrom 1876 as a temporary and from 1879 as a permanent lecturer at the Chair of Zootomy, Čokor was appointed in 1880 professor of general pathology and forensic veterinary medicine. In 1884 he deepened his knowledge with Robert Koch in Berlin. Already from 1889 also eminently Professor of infectious and parasitic diseases, he turned more to the parasitology, so in 1906 a chair for this discipline was established. Čokor also established and widely publicized the diagnostic vaccine stations. In addition, he taught from 1890 as a Privatdozent and from 1895 as a Professor of Veterinary Medicine at the University of Vienna. In 1909 he retired as professor and councilor.\n\nHe wrote for several scientific journals: "Österreichische Vierteljahresschrift für wissenschaftliche Veterinärkunde", "Allgemeine Wiener Medizinische Zeitung" and "Wiener Wochenschrift". He published "Lehrbuch der Gerichtsliche Thierheilkunde" (1898, 2nd ed. 1902 as "Textbook of Judicial Animal Medicine and Veterinary Law”).\n\nHe received in 1898 the Knight\'s Cross and in 1909 the officer\'s cross of the Franz Joseph Order and was knight of the Serbian Order of Saint Sava. He was also a member of the Society of Doctors and honorary member of the Serbian Society of Doctors in Belgrade. He was also Hofrat.\n\nHe died on 07.01.1911 in his apartment in Mödling, where he was buried.'
}];

export default class PersonList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      people: people,
      selected: null
    };
  }

  rowRenderer({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
  }) {
    const p = this.state.people[index];

    return (
      <div
        key={key}
        data-idx={index}
        className="row"
        style={style}
        onClick={this.selectPerson.bind(this)}>

        <span className="name">{p.name}</span>
        <span className="date">{p.date}</span>
        <span className="gender">
          {(p.gender === 'M') ? String.fromCharCode(0xf222) :  String.fromCharCode(0xf221)}
        </span>
      </div>
    )
  }

  filter(query) {
    const filtered = people.filter(person => {
      return person.name.toLowerCase().startsWith(query.toLowerCase());
    });

    this.setState({ people: filtered });
  }

  selectPerson(e) {
    const row = e.target.closest('.row');
    const idx = row.dataset.idx;
    const person = this.state.people[idx];
    // this._persondetails.show(person);
    this.setState({ selected: person });
    this.props.onSelectPerson(person);
  }

  deselectPerson(e) {
    this.setState({ selected: null });
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
                  rowCount={this.state.people.length}
                  rowHeight={40}
                  rowRenderer={this.rowRenderer.bind(this)} />
              )}
            </AutoSizer>
          </div>
        </div>

        <PersonDetails
          person={this.state.selected}
          onClose={this.deselectPerson.bind(this)} />
      </div>
    )
  }
}

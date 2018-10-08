import React, { Component } from 'react';

import Modal from './common/Modal.jsx';

export default class PersonDetails extends Component {

  render() {
    return (
      <Modal
        className="appinfo"
        onClose={this.props.onClose}>
        <div className="header">
          <h1>A Digital Geoportal of the History of the Serbs in Vienna (1741-1918)</h1>
          <h2>Ein digitales Geoportal der Geschichte der SerbInnen in Wien (1741-1918)</h2>
        </div>
        <div className="content">
          <p className="project-abstract">
            The present Geoportal, which was developed by the Austrian
            Institute of Technology (AIT; here Dr. Rainer Simon), is the
            prominent frontend of the project entitled &quot;A Digital
            Geoportal of the History of the Serbs in Vienna (1741-1918)&quot;
            at the Austrian Academy of Sciences in Vienna. This research
            project focuses on one of the aspects of the history and
            presence of Orthodox Christians, and in particular of the
            Orthodox Serbs, in Vienna.
          </p>
          <p className="project-abstract">
            It uses biographical data on the Orthodox Serbs in the period
            from 1741 until 1918 in order to illustrate how the Orthodox
            began to migrate to the Habsburg Empire, how Orthodox merchants
            settled in Vienna and how they integrated into Viennese society
            of that time. On the basis of meticulously researched data in
            Austrian archives and libraries the life of famous Serbs in
            Vienna is reconstructed. Their places of dwelling and action
            are localised and embedded into a customised OpenAtlas
            database (i.e. a backend) with this online Geoportal as a
            platform for the presentation of the data for academia and
            the interested public.
          </p>
        </div>
        <div className="footer">
          <a href="http://www.oeaw.ac.at" target="_blank">
            <img className="logo oeaw" src="public/images/logo-oeaw.png" />
          </a>
          <div className="imprint">
            <span>Österreichische Akademie der Wissenschaften</span>
            <span>Dr. Ignaz Seipel-Platz 2</span>
            <span>1010 Wien</span>
          </div>

          <div className="sponsored-by">
            <img className="logo ma7" src="public/images/logo-ma7.png" />
          </div>

          <div className="developed-by">
            <span>Development by</span>
            <a href="http://www.ait.ac.at/" target="_blank">
              <img className="logo ait" src="public/images/logo-ait.png" />
            </a>
          </div>
        </div>
      </Modal>
    )
  }

}
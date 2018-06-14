import React, { Component } from 'react';

import InfoButton from './components/InfoButton.jsx';
import ZoomControl from './components/ZoomControl.jsx';

export default class MapControls extends Component {

  render() {

    return (
      <div className="map-controls">
        <InfoButton
          onClick={this.props.onOpenAppInfo} />

        <ZoomControl
          onZoomIn={this.props.onZoomIn}
          onZoomOut={this.props.onZoomOut} />
      </div>
    )

  }

}

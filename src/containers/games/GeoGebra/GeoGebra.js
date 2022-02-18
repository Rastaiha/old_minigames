import React, { Component } from 'react';

class GeoGebra extends Component {
  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://cdn.geogebra.org/apps/deployggb.js';

    document.body.appendChild(script);
    script.onload = () => {
      // eslint-disable-next-line no-undef
      const applet = new GGBApplet(
        {
          id: 'ggbApplet',
          width: 800,
          height: 600,
          showToolBar: true,
          borderColor: null,
          showMenuBar: true,
          allowStyleBar: true,
          showAlgebraInput: true,
          enableLabelDrags: false,
          enableShiftDragZoom: true,
          capturingThreshold: null,
          showToolBarHelp: false,
          errorDialogsActive: true,
          showTutorialLink: true,
          showLogging: true,
          useBrowserForJS: false,
          perspective: '5',
        },
        '5.0',
        'applet_container'
      );

      window.onload = function () {
        applet.inject('applet_container');
      };
    };
  }
  render() {
    return <div id="applet_container" style={{ margin: 'auto' }}></div>;
  }
}
export default GeoGebra;

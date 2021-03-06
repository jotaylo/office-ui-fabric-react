'use strict';

let React = require('react');
let library = require('./lib');
let responsiveLib = require('./lib/utilities/decorators/withResponsiveMode');
let appstate = require('./lib/demo/components/App/AppState').AppState;
let ReactDOMServer = require('react-dom/server');


describe('Fabric components', () => {

  it('are SSR compliant on import', () => { });

  it('are SSR compliant on render', () => {
    // set required settings
    library.setSSR(true);
    library.setRTL(false);
    responsiveLib.setResponsiveMode(responsiveLib.ResponsiveMode.large);

    for (var i = 0; i < appstate.examplePages.length; i++) {
      var links = appstate.examplePages[i].links;
      for (var j = 0; j < links.length; j++) {
        var elem = React.createElement(links[j].component);
        ReactDOMServer.renderToString(elem);
      }
    }
  });
});



(function(React, NREUM) {  


  if (typeof React === 'undefined' || typeof React.addons === 'undefined' || typeof React.addons.Perf === 'undefined' || typeof React.addons.Perf.start !== 'function') {
    console.log('addons missing');
    return;
  }    
  if (typeof NREUM === 'undefined' && typeof NREUM.interaction !== 'function' ) {
    console.log('api missing');
    return;
  }
  function testPerf(){
      // do whatever you like here
      var myInteraction = newrelic.interaction().setName('tracing');
      React.addons.Perf.start();
      console.log('tracing');
      setTimeout(function(){
        React.addons.Perf.stop();
        console.log('stopping');
        var map = React.addons.Perf.getMeasurementsSummaryMap(React.addons.Perf._allMeasurements);
        console.log(map.length);
        for (var i = 0; i < map.length; i++) {
          if (typeof NREUM !== 'undefined' && typeof NREUM.addPageAction === 'function' ) {
            console.log('sending');
            myInteraction.setAttribute(map[i]['Owner > component'], map[i]['Wasted time (ms)']);
            myInteraction.setAttribute('Instances: ' + map[i]['Owner > component'],map[i]['Instances']);
          }
        }
        myInteraction.save().end();
        setTimeout(testPerf, 1000);

      }, 10000);

      
  }

  setTimeout(function(){
    testPerf();
  }, 1000);

  
})(window.React, window.NREUM);
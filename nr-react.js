

(function(React, NREUM) {  


  if (typeof React === 'undefined' || typeof React.addons === 'undefined' || typeof React.addons.Perf === 'undefined' || typeof React.addons.Perf.start !== 'function') {
    console.log('addons missing');
    return;
  }    

  function testPerf(){
      // do whatever you like here
      React.addons.Perf.start();

      setTimeout(function(){
        React.addons.Perf.stop();
        var map = React.addons.Perf.getMeasurementsSummaryMap(React.addons.Perf._allMeasurements);
        for (var i = 0; i < map.length; i++) {
          if (typeof NREUM !== 'undefined' && typeof NREUM.addPageAction === 'function' ) {
            NREUM.addPageAction('react-perf', {Instances: map[i]['Instances'], OwnerComponent: map[i]['Owner > component'], wastedTime: map[i]['Wasted time (ms)']});
          }
        }
        setTimeout(testPerf, 1000);

      }, 10000);

      
  }

  setTimeout(function(){
    testPerf();
  }, 5000);

  
})(window.React, window.NREUM);
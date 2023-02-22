var bleno = require('bleno');
var CiqService = require('./ciqbaseservice');
var logIt=require('./logit');
var ciqService = new CiqService();

bleno.on('stateChange', function(state) {
  console.log('Using Base Characteristices');

  if(logIt) {console.log('on -> stateChange: ' + state);}

  if (state === 'poweredOn') {

    bleno.startAdvertising('CIQ BLE', [ciqService.uuid]);
  }
  else {

    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {

  if(logIt) {console.log('on -> advertisingStart: ' +
    (error ? 'error ' + error : 'success')
  );}

  if (!error) {

    bleno.setServices([
      ciqService
    ]);
  }
});

bleno.on('disconnect', function(error) {
  if(logIt) {console.log('-> disconnect <-');}
});
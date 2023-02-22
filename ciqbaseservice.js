var bleno = require('bleno');
var util = require('util');
var UUID = require('./mainuuid');
var logIt = require('./logit');

var MemoryCharacteristic = require('./characteristics/base/memory');
var HrvCharacteristic  = require('./characteristics/base/hrv');

function CiqService() {

  if(logIt) {console.log('-> CIQ Service Gatt Setup <-');}

  bleno.PrimaryService.call(this, {
    uuid: UUID+'00',
    characteristics: [
      new MemoryCharacteristic(),
      new HrvCharacteristic()
    ]
  });
};


util.inherits(CiqService, bleno.PrimaryService);
module.exports = CiqService;

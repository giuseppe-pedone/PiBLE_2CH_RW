var bleno = require('bleno');
var os = require('os');
var util = require('util');
var UUID = require('../../mainuuid');
var logIt=require('../../logit')

var BlenoCharacteristic = bleno.Characteristic;

var MemoryCharacteristic = function() {
  
  if(logIt) {console.log('Costruct Memory Base Char');}
  
  MemoryCharacteristic.super_.call(this, {
    uuid: UUID+'10',
    properties: ['read'],
  });

 this._value = Buffer.from([0]);
};

MemoryCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if(logIt) {console.log('Base Memory Char - onRead');}

  if(!offset) {
    this._value=Buffer.from(JSON.stringify({'mem' : os.freemem()}));
    if(logIt) {console.log('Base Memory Char - onReadRequest: value = ' +
      this._value.slice(offset, offset + bleno.mtu).toString()
    );}
  }
  
  callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));

  
    
};

util.inherits(MemoryCharacteristic, BlenoCharacteristic);
module.exports = MemoryCharacteristic;

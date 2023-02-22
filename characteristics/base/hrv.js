var util = require('util');
var bleno = require('bleno');
var UUID = require('../../mainuuid');
var logIt=require('../../logit');

var BlenoCharacteristic = bleno.Characteristic;

var HrvCharacteristic = function() {

  if(logIt) {console.log('Costruct HRV Base Char');}

  HrvCharacteristic.super_.call(this, {
    uuid: UUID+'13',
    properties: ['read', 'write', 'notify'],
    value: null
  });

  this._value = Buffer.from([0,0]);
  this._updateValueCallback = null;
};

util.inherits(HrvCharacteristic, BlenoCharacteristic);

HrvCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if(logIt) {console.log('Base HRV Char - onRead');}
  
  callback(this.RESULT_SUCCESS, this._value.slice(offset,this._value.length));

  if(logIt) {console.log('Base HRV Char - onReadRequest: value = 0x' + this._value.toString('hex'));}


};

HrvCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  this._value = data;
  if(logIt) {console.log('Base HRV Char - onWrite');}
  

  if (this._updateValueCallback) {
    console.log('Base HRV Char - notifying');
    this._updateValueCallback(this._value);
  }

  if(logIt) {console.log('Base HRV Char - onWriteRequest: value = 0x' + this._value.toString('hex'));}
  callback(this.RESULT_SUCCESS);
};

HrvCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('Base HRV Char - onSubscribe');

  this._updateValueCallback = updateValueCallback;
};

HrvCharacteristic.prototype.onUnsubscribe = function() {
  console.log('Base HRV Char - onUnsubscribe');

  this._updateValueCallback = null;
};

module.exports = HrvCharacteristic;

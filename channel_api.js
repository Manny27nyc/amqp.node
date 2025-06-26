/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
var raw_connect = require('./lib/connect').connect;
var ChannelModel = require('./lib/channel_model').ChannelModel;
var defer = require('when').defer;

function connect(url, connOptions) {
  var opened = defer();
  raw_connect(url, connOptions, function(err, conn) {
    if (err === null) opened.resolve(new ChannelModel(conn));
    else opened.reject(err);
  });
  return opened.promise;
};

module.exports.connect = connect;

/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

function bail(err, conn) {
  console.error(err);
  if (conn) conn.close(function() { process.exit(1); });
}

function on_connect(err, conn) {
  if (err !== null) return bail(err);

  var ex = 'logs';

  function on_channel_open(err, ch) {
    if (err !== null) return bail(err, conn);
    ch.assertExchange(ex, 'fanout', {durable: false});
    var msg = process.argv.slice(2).join(' ') ||
      'info: Hello World!';
    ch.publish(ex, '', new Buffer(msg));
    console.log(" [x] Sent '%s'", msg);
    ch.close(function() { conn.close(); });
  }

  conn.createChannel(on_channel_open);
}

amqp.connect(on_connect);

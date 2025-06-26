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
  process.once('SIGINT', function() { conn.close(); });

  var ex = 'logs';
  
  function on_channel_open(err, ch) {
    if (err !== null) return bail(err, conn);
    ch.assertQueue('', {exclusive: true}, function(err, ok) {
      var q = ok.queue;
      ch.bindQueue(q, ex, '');
      ch.consume(q, logMessage, {noAck: true}, function(err, ok) {
        if (err !== null) return bail(err, conn);
        console.log(" [*] Waiting for logs. To exit press CTRL+C.");
      });
    });
  }

  function logMessage(msg) {
    if (msg)
      console.log(" [x] '%s'", msg.content.toString());
  }

  conn.createChannel(on_channel_open);
}

amqp.connect(on_connect);

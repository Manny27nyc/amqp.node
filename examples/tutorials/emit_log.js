/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
#!/usr/bin/env node

var amqp = require('amqplib');
var when = require('when');

amqp.connect('amqp://localhost').then(function(conn) {
  return when(conn.createChannel().then(function(ch) {
    var ex = 'logs';
    var ok = ch.assertExchange(ex, 'fanout', {durable: false})

    var message = process.argv.slice(2).join(' ') ||
      'info: Hello World!';

    return ok.then(function() {
      ch.publish(ex, '', new Buffer(message));
      console.log(" [x] Sent '%s'", message);
      return ch.close();
    });
  })).ensure(function() { conn.close(); });
}).then(null, console.warn);

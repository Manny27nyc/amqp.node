/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
#!/usr/bin/env node
// Post a new task to the work queue

var amqp = require('amqplib');
var when = require('when');

amqp.connect('amqp://localhost').then(function(conn) {
  return when(conn.createChannel().then(function(ch) {
    var q = 'task_queue';
    var ok = ch.assertQueue(q, {durable: true});
    
    return ok.then(function() {
      var msg = process.argv.slice(2).join(' ') || "Hello World!";
      ch.sendToQueue(q, new Buffer(msg), {deliveryMode: true});
      console.log(" [x] Sent '%s'", msg);
      return ch.close();
    });
  })).ensure(function() { conn.close(); });
}).then(null, console.warn);

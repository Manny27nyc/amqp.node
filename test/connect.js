// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
'use strict';

var connect = require('../lib/connect').connect;
var assert = require('assert');
var util = require('./util');
var fail = util.fail, succeed = util.succeed,
    kCallback = util.kCallback;

var URL = process.env.URL || 'amqp://localhost';

suite("Connect API", function() {

  test("Connection refused", function(done) {
    connect('amqp://localhost:23450', {},
            kCallback(fail(done), succeed(done)));
  });
  
  // %% this ought to fail the promise, rather than throwing an error
  test("bad URL", function() {
    assert.throws(function() {
      connect('blurble');
    });
  });

  test("wrongly typed open option", function(done) {
    var url = require('url');
    var parts = url.parse(URL, true);
    var q = parts.query || {};
    q.frameMax = 'NOT A NUMBER';
    parts.query = q;
    var u = url.format(parts);
    connect(u, {}, kCallback(fail(done), succeed(done)));
  });

});

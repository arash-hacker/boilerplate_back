
const winston = require('winston')
require('winston-mongodb')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const socketIO = require('socket.io')
const http = require('http')
//var sticky = require('socketio-sticky-session')
var sticky = require('sticky-session');
const cluster = require('cluster');
const sio_redis = require('socket.io-redis');
const farmhash = require('farmhash');
const net = require('net');

if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');
    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} 
else
{
  
	
}


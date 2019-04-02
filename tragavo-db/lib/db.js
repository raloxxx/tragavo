'use strict'

const Mongoose = require('mongoose')
let mongoose = null
const chalk = require('chalk')

const connected = chalk.bold.cyan
const error = chalk.bold.yellow
var disconnected = chalk.bold.red
var termination = chalk.bold.magenta
module.exports = async function setupDatabase (uri, config) {
  if (!mongoose) {
    mongoose = Mongoose.connect(uri, config)

    // controlamos eventos
    Mongoose.connection.on('open', function () {
      console.log(connected('Mongoose default connection is open to ', uri))
    })

    Mongoose.connection.on('error', function (err) {
      console.log(error('Mongoose default connection has occured ' + err + ' error'))
    })

    Mongoose.connection.on('disconnected', function () {
      console.log(disconnected('Mongoose default connection is disconnected'))
    })

    process.on('SIGINIT', function () {
      Mongoose.connection.close(function () {
        console.log(termination('Mongoose default connection is disconnected due to application termination'))

        process.exit(0)
      })
    })
  }

  return mongoose
}

/*
 db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  user: 'myUserName',
  pass: 'myPassword'
}

options = {
    user: '',
    pass: '',
}
*/

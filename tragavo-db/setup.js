'use strict'

const inquirer = require('inquirer')
const minimist = require('minimist')
const chalk = require('chalk')
const db = require('./index')

const args = minimist(process.argv)
const prompt = inquirer.createPromptModule()
async function setup () {
  if (!args.yes) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'Este accion se encarga de destruir la base de datos, desea continuar?'
      }
    ])

    if (!answer.setup) {
      return console.log('Acción cancelada!')
    }
  }

  // configuración de la base de datos

  const uri = 'mongodb://localhost:27017/tragavo'
  const config = {
    user: process.env.DB_USER || 'myTester',
    pass: process.env.DB_PASS || 'xyz123',
    setup: true
  }

  await db(uri, config).catch(handleFatalError)

  console.log('correcto :)')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[Fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)// terminar proceso con error
}

setup()

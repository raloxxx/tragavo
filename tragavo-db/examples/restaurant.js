'use strict'

const db = require('../')

async function run () {
  const uri = 'mongodb://localhost:27017/tragavo'
  const config = {
    user: process.env.DB_USER || 'myTester',
    pass: process.env.DB_PASS || 'xyz123'
  }
  const { Event, Restaurant } = await db(uri, config).catch(handleFatalError)

  const restaurant1 = await Restaurant.createOrUpdate({
    name: 'Robin Food',
    email: 'robinfood@gmail.com',
    phones: [],
    address: 'Av.Huandoy 39, Los Olivos 15369, Perú',
    country: 'Perú',
    city: 'Lima',
    categories: ['pizzeria', 'polleria'],
    url: 'https://robinfood.com',
    opinions: [],
    horary: { start: '8 am', end: '10 pm' },
    contact: '',
    branchOffices: [],
    qualification: []
  })
  console.log('====RESTAURANT 1 =====')
  console.log(restaurant1)

  const restaurant2 = await Restaurant.createOrUpdate({
    name: 'Papa Johns',
    email: 'papJhons@gmail.com',
    phones: [],
    address: 'Av.Huandoy 39, Los Olivos 15369, Perú',
    country: 'Perú',
    city: 'Cusco',
    categories: ['vegetariana'],
    url: 'https://papJhons.com',
    opinions: [],
    horary: { start: '8 am', end: '10 pm' },
    contact: '',
    branchOffices: [],
    qualification: []
  })
  console.log('====RESTAURANT 2 =====')
  console.log(restaurant2)

  const restaurant3 = await Restaurant.createOrUpdate({
    name: 'La Pastana',
    email: 'lapastana@gmail.com',
    phones: [],
    address: 'Av.Huandoy 39, Los Olivos 15369, Perú',
    country: 'Perú',
    city: 'Lima',
    categories: ['carnes', 'parrilla', 'polleria'],
    url: 'https://lapastana.com',
    opinions: [],
    horary: { start: '8 am', end: '10 pm' },
    contact: '',
    branchOffices: [],
    qualification: []
  })
  console.log('====RESTAURANT 3 =====')
  console.log(restaurant3)

  const findById = await Restaurant.findById('5caccbb99286cf2328388129')
  console.log('=====  RESULT FINDBYID =======')
  console.log(findById)

  const findByCountry = await Restaurant.findByCountry('Perú')
  console.log('=====  RESULT findByCountry =======')
  console.log(findByCountry)

  const findByCity = await Restaurant.findByCity('Cusco')
  console.log('=====  RESULT findByCity =======')
  console.log(findByCity)

  const findByCategories = await Restaurant.findByCategories(['vegetariana'])
  console.log('=====  RESULT findByCategories =======')
  console.log(findByCategories)

  const findAll = await Restaurant.findAll()
  console.log('=====  RESULT findAll =======')
  console.log(findAll)
}

function handleFatalError (err) {
  console.log('ERRORR')
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
run()

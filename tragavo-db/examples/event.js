'use strict'

const db = require('..')

async function run () {
  const uri = 'mongodb://localhost:27017/tragavo'
  const config = {
    user: process.env.DB_USER || 'myTester',
    pass: process.env.DB_PASS || 'xyz123'
  }
  const { Event, Restaurant } = await db(uri, config).catch(handleFatalError)

  const puertoMaldonadoCerca = { type: 'Point', coordinates: [ -12.578098, -69.198895 ] }
  const puertoMaldonadoLejos = { type: 'Point', coordinates: [ -12.599530, -69.188688 ] }
  const puertoMaldonadoMedio = { type: 'Point', coordinates: [ -12.591630, -69.195872 ] }

  const arequipa = { type: 'Point', coordinates: [ -16.411924, -71.538882 ] }

  const Event1 = await Event.createOrUpdate({
    title: 'Noticia primera',
    description: 'Simple descripcion',
    authorId: 'abc-abc-abc',
    author: {
      name: 'anonimo',
      email: 'DenisricardoVilcas@gmail.com'
    },
    location: puertoMaldonadoLejos,
    createdAt: new Date(2019, 2, 22),
    comments: [],
    tags: ['vinos', 'politica', 'deporte'],
    calendar: [ { date: new Date(2019, 3, 4) },
      { date: new Date(2019, 3, 5) }
    ]
  }).catch(handleFatalError)

  const Event2 = await Event.createOrUpdate({
    title: 'Noticia puerto maldonado Medioo',
    description: 'Simple descripcion',
    authorId: 'abc-abc-abc',
    author: {
      name: 'anonimo'
    },
    location: puertoMaldonadoMedio,
    createdAt: Date.now(),
    comments: [],
    tags: ['postres', 'cocteles', 'deporte'],
    calendar: [ { date: new Date(2019, 3, 9) },
      { date: new Date(2019, 3, 10) },
      { date: new Date(2019, 3, 11) },
      { date: new Date(2019, 3, 12) }
    ]
  }).catch(handleFatalError)

  const Event3 = await Event.createOrUpdate({
    title: 'Noticia cerca',
    description: 'Simple descripcion',
    authorId: 'def-def-def',
    author: {
      name: 'otro'
    },
    location: puertoMaldonadoCerca,
    createdAt: Date.now(),
    comments: [],
    tags: ['vinos', 'musica'],
    calendar: [ { date: new Date(2019, 3, 14) },
      { date: new Date(2019, 3, 16) },
      { date: new Date(2019, 3, 18) }
    ]
  }).catch(handleFatalError)

  const Event4 = await Event.createOrUpdate({
    title: 'Noticia arequipa 2 ',
    description: 'Simple descripcion',
    authorId: 'def-def-def',
    author: {
      name: 'otro'
    },
    location: arequipa,
    createdAt: Date.now(),
    comments: []
  }).catch(handleFatalError)

  console.log('CREATING NEWS EventS')

  console.log(Event1)
  console.log('===============')
  console.log(Event2)
  console.log('===============')
  console.log(Event3)
  console.log('===============')
  console.log(Event4)

  const tidignByLocation = await Event.findByLocation([-12.575595, -69.199120], 62).catch(handleFatalError)
  console.log('======== LOCATION :( :( ========')
  console.log(tidignByLocation)
  console.log('===============')

  const EventByCategories = await Event.findByTags(['vinos']).catch(handleFatalError)
  console.log('======== Categoriess :( :( ========')
  console.log(EventByCategories)
  console.log('===============')

  const findByAuthorUuid = await Event.findByAuthorUuid('abc-abc-abc').catch(handleFatalError)
  console.log('======== Author UUID :( :( ========')
  console.log(findByAuthorUuid)
  console.log('=============')

  const EventFindAll = await Event.findAll().catch(handleFatalError)
  console.log('=========ALLLLLLLLL======')
  console.log(EventFindAll)

  const eventFindById = await Event.findById('5ca2b332f14056645c34648b').catch(handleFatalError)
  console.log('=========tidingFindById======')
  console.log(eventFindById)

  const eventFindByCalendar = await Event.findByCalendar([new Date(2019, 3, 14), new Date(2019, 3, 4)])
  console.log('=========eventFindByCalendar======')
  console.log(eventFindByCalendar)
}

function handleFatalError (err) {
  console.log('ERRORR')
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
run()

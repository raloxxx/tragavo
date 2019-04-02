'use strict'

const db = require('../')

async function run () {
  const uri = 'mongodb://localhost:27017/tragavo'
  const config = {
    user: process.env.DB_USER || 'myTester',
    pass: process.env.DB_PASS || 'xyz123'
  }
  const { Tiding, Restaurant } = await db(uri, config).catch(handleFatalError)

  const puertoMaldonadoCerca = { type: 'Point', coordinates: [ -12.578098, -69.198895 ] }
  const puertoMaldonadoLejos = { type: 'Point', coordinates: [ -12.599530, -69.188688 ] }
  const puertoMaldonadoMedio = { type: 'Point', coordinates: [ -12.591630, -69.195872 ] }

  const arequipa = { type: 'Point', coordinates: [ -16.411924, -71.538882 ] }

  // const tiding1 = await Tiding.createOrUpdate({
  //   title: 'Noticia primera',
  //   description: 'Simple descripcion',
  //   authorId: 'abc-abc-abc',
  //   author: {
  //     name: 'anonimo',
  //     email: 'DenisricardoVilcas@gmail.com'
  //   },
  //   location: puertoMaldonadoLejos,
  //   createdAt: new Date(2019,2,22),
  //   comments: [],
  //   tags: ['vinos', 'politica', 'deporte']
  // }).catch(handleFatalError)

  // const tiding2 = await Tiding.createOrUpdate({
  //   title: 'Noticia puerto maldonado Medioo',
  //   description: 'Simple descripcion',
  //   authorId: 'abc-abc-abc',
  //   author: {
  //     name: 'anonimo'
  //   },
  //   location: puertoMaldonadoMedio,
  //   createdAt: Date.now(),
  //   comments: [],
  //   tags: ['postres', 'cocteles', 'deporte']
  // }).catch(handleFatalError)

  // const tiding3 = await Tiding.createOrUpdate({
  //   title: 'Noticia cerca',
  //   description: 'Simple descripcion',
  //   authorId: 'def-def-def',
  //   author: {
  //     name: 'otro'
  //   },
  //   location: puertoMaldonadoCerca,
  //   createdAt: Date.now(),
  //   comments: [],
  //   tags: ['vinos', 'musica']
  // }).catch(handleFatalError)

  // const tiding4 = await Tiding.createOrUpdate({
  //   title: 'Noticia arequipa 2 ',
  //   description: 'Simple descripcion',
  //   authorId: 'def-def-def',
  //   author: {
  //     name: 'otro'
  //   },
  //   location: arequipa,
  //   createdAt: Date.now(),
  //   comments: []
  // }).catch(handleFatalError)

  // console.log('CREATING NEWS TIDINGS')

  // console.log(tiding1)
  // console.log('===============')
  // console.log(tiding2)
  // console.log('===============')
  // console.log(tiding3)
  // console.log('===============')
  // console.log(tiding4)

  const tidignByLocation = await Tiding.findByLocation([-12.575595, -69.199120], 62).catch(handleFatalError)
  console.log('======== LOCATION :( :( ========')
  console.log(tidignByLocation)
  console.log('===============')

  const tidingByCategories = await Tiding.findByTags(['vinos']).catch(handleFatalError)
  console.log('======== Categoriess :( :( ========')
  console.log(tidingByCategories)
  console.log('===============')

  const findByAuthorUuid = await Tiding.findByAuthorUuid('abc-abc-abc').catch(handleFatalError)
  console.log('======== Author UUID :( :( ========')
  console.log(findByAuthorUuid)
  console.log('=============')

  const tidingFindAll = await Tiding.findAll().catch(handleFatalError)
  console.log('=========ALLLLLLLLL======')
  console.log(tidingFindAll)

  const tidingFindById = await Tiding.findById('5ca2b332f14056645c34648b').catch(handleFatalError)
  console.log('=========tidingFindById======')
  console.log(tidingFindById)
}

function handleFatalError (err) {
  console.log('ERRORR')
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
run()

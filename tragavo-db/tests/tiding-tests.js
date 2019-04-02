'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const tidingFixtures = require('./fixtures/tiding')

let config = {}
let uri = ''

let db = null
let sandbox = null
let TidingStub = null
let RestaurantStub = {}
let single = Object.assign({}, tidingFixtures.single)
let _id = '5ca0fcc3eb242703246fc1af9'
let uuidAuthor = 'abc-abc-abc'
let coordinates = [-12.575595, -69.199120]
let distance = 62 //en millas

let tags = ['menu', 'bebida']
let _idArgs = {
  _id
}
let uuidAuthorArgs = {
  authorId: uuidAuthor
}
let sortArgs = {
  sort: { createdAt: 1 }
}
let byLocationArgs = {
  location: {
    $nearSphere: {
      $geometry: {
        type: 'Point',
        coordinates: coordinates
      },
      $maxDistance: distance * 1609.34
    }
  }
}
let byTagsArgs = {
    tags: { $in: tags}
}

let newTiding = {
  _id: '5ca0fcc3eb2423453246fc1af,',
  title: 'Noticia nueva',
  tags: ['postres'],
  description: 'Esto es una simple descripcion para los fixtures',
  createdAt: new Date(),
  location: { coordinates: [-12.391630, -69.195872], type: 'Point' },
  authorId: 'abc-abc-abc',
  author: { name: 'anonimo' },
  comments: []
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  TidingStub = {}

  // Model create Stub
  TidingStub.create = sandbox.stub()
  TidingStub.create.withArgs(newTiding).returns(Promise.resolve({ toJSON () { return newTiding } }))

  // Model findOne Stub
  TidingStub.findOne = sandbox.stub()
  TidingStub.findOne.withArgs(_idArgs).returns(Promise.resolve(tidingFixtures.byId(_id)))

  // Model updateOne Stub
  TidingStub.updateOne = sandbox.stub()
  TidingStub.updateOne.withArgs(_idArgs, { $set: single }).returns(Promise.resolve(single))

  // Model findById Stub
  TidingStub.findById = sandbox.stub()
  TidingStub.findById.withArgs(_id).returns(Promise.resolve(tidingFixtures.byId(_id)))

  // Model find Stub
  TidingStub.find = sandbox.stub()
  TidingStub.find.withArgs(null, null, sortArgs).returns(Promise.resolve(tidingFixtures.all))
  TidingStub.find.withArgs(uuidAuthorArgs).returns(Promise.resolve(tidingFixtures.byAuthorUuid(uuidAuthor)))
  TidingStub.find.withArgs(byLocationArgs).returns(Promise.resolve(tidingFixtures.byLocation(coordinates, distance)))
  TidingStub.find.withArgs(byTagsArgs).returns(Promise.resolve(tidingFixtures.byTags(tags)))

  const setupDatabase = proxyquire('../', {
    './models/tiding': () => TidingStub,
    './models/restaurant': () => RestaurantStub
  })

  db = await setupDatabase(uri, config)
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test('Tiding', t => {
  t.truthy(db.Tiding, 'Servicios Tiding exitoso')
})

test.serial('Tiding#createOrUpdate - new', async t => {
  let tiding = await db.Tiding.createOrUpdate(newTiding)

  t.true(TidingStub.findOne.called, 'findOne debe ser llamado en el modelo')
  t.true(TidingStub.findOne.calledOnce, 'findOne debe llamarse 1 vez')
  t.true(TidingStub.findOne.calledWith({
    _id: newTiding._id
  }), 'findOne debe llamarse con el argumento _id')

  t.true(TidingStub.create.called, 'create debe ser llamado en el modelo')
  t.true(TidingStub.create.calledOnce, 'create debe llamarse 1 vez')
  t.true(TidingStub.create.calledWith(newTiding), 'create debe ser llamado con argumento newTiding')

  t.deepEqual(tiding, newTiding, 'el tiding debe ser el mismo')
})

test.serial('Tiding#createOrUpdate - exist', async t => {
  let tiding = await db.Tiding.createOrUpdate(single)

  t.true(TidingStub.findOne.called, 'findOne debe ser llamado en el modelo')
  t.true(TidingStub.findOne.calledTwice, 'findOne debe ser llamado 2 veces')
  t.true(TidingStub.findOne.calledWith({
    _id: single._id
  }), 'findOne debe llamarse con el argumento _id')

  t.true(TidingStub.updateOne.called, 'updateOne debe ser llamado en el modelo')
  t.true(TidingStub.updateOne.calledOnce, 'updateOne debe llamarse 1 vez')
  t.true(TidingStub.updateOne.calledWith(
    { _id: single._id },
    { $set: single }
  ), 'updateOne debe llamarse con los arguemntos _id y tiding')

  t.deepEqual(tiding, single, 'el tiding debe ser el mismo')
})

test.serial('Tiding#findById', async t => {
  let tiding = await db.Tiding.findById(_id)

  t.true(TidingStub.findById.called, 'findById debe ser llamado en el modelo')
  t.true(TidingStub.findById.calledOnce, 'findById debe llamarse 1 vez')
  t.true(TidingStub.findById.calledWith(_id), 'findById debe llamarse con el argumento _id')

  t.deepEqual(tiding, single, 'el tiding debe ser el mismo')
})

test.serial('Tiding#findByAuthorUuid', async t => {
  let tidings = await db.Tiding.findByAuthorUuid(uuidAuthor)

  t.true(TidingStub.find.called, 'find debe ser llamado en el modelo')
  t.true(TidingStub.find.calledOnce, 'find debe llamarse 1 vez')
  t.true(TidingStub.find.calledWith(uuidAuthorArgs), 'find debe llamarse con el argumento uuidAuthor')

  t.deepEqual(tidings, tidingFixtures.byAuthorUuid(uuidAuthor), 'los tidings debe ser el mismo')
})

test.serial('Tiding#findALL', async t => {
  let tidings = await db.Tiding.findAll()

  t.true(TidingStub.find.called, 'find debe ser llamado en el modelo')
  t.true(TidingStub.find.calledOnce, 'find debe llamarse 1 vez')
  t.true(TidingStub.find.calledWith(null, null, sortArgs), 'find debe llamarse con el argumento findAllArgs')

  t.deepEqual(tidings, tidingFixtures.all, 'los tidings debe ser el mismo')
})

test.serial('Tiding#findByLocation', async t => {
  let tidings = await db.Tiding.findByLocation(coordinates, distance)
  t.true(TidingStub.find.called, 'find debe ser llamado en el modelo')
  t.true(TidingStub.find.calledOnce, 'find debe llamarse 1 vez')
  t.true(TidingStub.find.calledWith(byLocationArgs), 'find debe llamarse con el argumento byLocationArgs')

  t.deepEqual(tidings, tidingFixtures.byLocation(coordinates, distance), 'los tidings debe ser el mismo')
})

test.serial('Tiding#findByTags', async t => {
    let tidings = await db.Tiding.findByTags(tags)

    t.true(TidingStub.find.called, 'find debe ser llamado en el modelo')
    t.true(TidingStub.find.calledOnce, 'find debe llamarse 1 vez')
    t.true(TidingStub.find.calledWith(byTagsArgs), 'find debe llamarse con el argumento byLocationArgs')
  
    t.deepEqual(tidings, tidingFixtures.byTags(tags), 'los tidings debe ser el mismo')
})


// Implementar las siguientes pruebas

// test.serial.todo('Tiding#createOrUpdate - new')
// test.serial.todo('Tiding#createOrUpdate - exist')
// test.serial.todo('Tiding#findById')
// test.serial.todo('Tiding#findByAuthorUuid')
// test.serial.todo('Tiding#findALL')
// test.serial.todo('Tiding#findByLocation')
// test.serial.todo('Tiding#findByTags')

'use strict'
const turf = require('@turf/turf')

const tiding = {
  _id: '5ca0fcc3eb242703246fc1af9',
  title: 'Nuevo Chef en la cocina',
  tags: ['postres'],
  description: 'Esto es una simple descripcion para los fixtures',
  createdAt: new Date(),
  location: { coordinates: [-12.591630, -69.195872], type: 'Point' },
  authorId: 'abc-abc-abc',
  author: { name: 'anonimo' },
  comments: []
}

const tidings = [
  tiding,
  extended(tiding, { _id: '5ca0fcgfdeb242703246fc1af', title: 'Comida hecha con ciencia', authorId: 'xyz-xyz-xyz', location: { coordinates: [-12.578098, -69.198895], type: 'Point' }, tags: ['ciencia', 'menu'] }),
  extended(tiding, { _id: '5ca0fccyteb242703246fc1af', title: 'Bebida de caramelos', authorId: 'xyz-xyz-xyz', location: { coordinates: [-12.599530, -69.188688], type: 'Point' }, tags: ['bebida', 'dulces'] }),
  extended(tiding, { _id: '5ca0fccgasc242703246fc1af', title: 'Nuevo local sera inaugurado', authorId: 'abc-abc-abc', location: { coordinates: [-16.411924, -71.538882], type: 'Point' }, tags: ['informativo'] }),
  extended(tiding, { _id: '5ca0fcc3eopj42703246fc1af', title: 'Noticia de HUACHO', authorId: 'der-der-der', location: { coordinates: [-10.954423, -77.460841], type: 'Point' }, tags: ['menu', 'informativo'] })
]

function extended (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: tiding,
  all: tidings.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt)
  }),
  byId: id => tidings.filter(a => a._id === id).shift(),
  byAuthorUuid: uuid => tidings.filter(a => a.authorId === uuid),
  byTags: tags => tidings.filter( a => a.tags.includes( tags[1] ) ),//falta modificar
  byLocation: (coordinates, distance) => tidings
    .filter(a => Math.round(turf.distance(turf.point(coordinates), turf.point(a.location.coordinates), { units: 'miles' })) <= distance)
    .sort((a, b) => turf.distance(turf.point(coordinates), turf.point(a.location.coordinates), { units: 'miles' }) - turf.distance(turf.point(coordinates), turf.point(b.location.coordinates), { units: 'miles' }))
}

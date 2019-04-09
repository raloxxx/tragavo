# tragavo-db

## usage

``` js

const setupDatabase = require('tragavo-db')

setupDatabase(config).then(db => {
    const { Restaurant, Event } = db

}).catch(err => console.error(err))
/*
Event: {
    createOrUpdate,
    findById,
    findAll,
    findByAuthorUuid,
    findByLocation,
    findByTags,
    findByCalendar
}
*/

/*
Restaurant: {
    createOrUpdate,
    findById,
    findByCountry,
    findByCity,
    findByCategories,
    findAll
}
*/


```
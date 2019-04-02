# tragavo-db

##usage

``` js

const setupDatabase = require('tragavo-db')

setupDatabase(config).then(db => {
    const { Restaurant } = db

}).catch(err => console.error(err))

```
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoDb = require('./bdd/mongodb');

app = express()

/**
 * CORS init 
 */
app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
}))


/**
 * Body Parser inits
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


/**
 * MongoDb init
 */
var model = MongoDb.start()


/**
 * Route
 */
route = require('./router/route')(express, model)
app.use('/', route)


/**
 * Staring server
 */
app.listen(3000, () => {
    console.log('Server running')
});
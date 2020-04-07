require('dotenv').config()
const express = require('express')
const { Keystone } = require('@keystonejs/keystone')
const { GraphQLApp } = require('@keystonejs/app-graphql')
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose')
const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const initialiseData = require('./initial-data')
const initModels = require('./app/models/init')
const initAuth = require('./app/auth/init')
const initUserMutations = require('./app/users/mutations')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const sessionStore = new MongoStore({ url: process.env.MONGO_URI })
const keystone = new Keystone({
  name: 'Keystonejs boilerplate',
  adapter: new MongooseAdapter({
    mongoUri: process.env.MONGO_URI
  }),
  onConnect: initialiseData,
  sessionStore,
  cookieSecret: process.env.SECRET
})

initModels(keystone)
const authStrategy = initAuth(keystone)
initUserMutations(keystone, authStrategy)

keystone
  .prepare({
    apps: [
      new GraphQLApp(),
      new AdminUIApp({
        enableDefaultRoute: true,
        authStrategy
      })
    ],
    dev: process.env.NODE_ENV !== 'production'
  })
  .then(async ({ middlewares }) => {
    await keystone.connect()
    const app = express()

    app.use(session({
      store: sessionStore,
      secret: process.env.SECRET
    }))

    app.set('view engine', 'ejs')

    app.get('/', (req, res) => {
      res.render('index')
    })

    app.use(middlewares).listen(3000)
  })

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy
    })
  ]
}

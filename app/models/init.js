const product = require('../products/model.js')
const user = require('../users/model.js')

const initModels = (keystone) => {
  [
    product,
    user
  ].forEach(model => keystone.createList(model.name, model.schema))
}

module.exports = initModels

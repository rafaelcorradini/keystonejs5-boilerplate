const access = require('../auth/permissions')
const { Text } = require('@keystonejs/fields')

module.exports = {
  name: 'Product',
  schema: {
    fields: {
      name: { type: Text },
      sku: {
        type: Text,
        isUnique: true
      },
      description: { Type: Text }
    },
    access: {
      read: access.userHasRole(['admin', 'customer']),
      create: access.userHasRole(['admin']),
      update: access.userHasRole(['admin']),
      delete: access.userHasRole(['admin']),
      auth: true
    }
  }
}

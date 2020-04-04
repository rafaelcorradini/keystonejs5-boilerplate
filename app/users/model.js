const access = require('../auth/permissions')
const { Text, Password } = require('@keystonejs/fields')

module.exports = {
  name: 'User',
  schema: {
    fields: {
      name: { type: Text },
      email: {
        type: Text,
        isUnique: true
      },
      role: { type: Text },
      password: {
        type: Password
      }
    },
    access: {
      read: access.userHasRoleOrOwner(['admin']),
      update: access.userHasRoleOrOwner(['admin']),
      create: access.userHasRole(['admin']),
      delete: access.userHasRole(['admin']),
      auth: true
    }
  }
}
